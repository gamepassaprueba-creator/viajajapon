import { createSign } from "node:crypto";

const GOOGLE_TOKEN_URI = "https://oauth2.googleapis.com/token";
const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/analytics.readonly",
];

type ServiceAccount = {
  client_email: string;
  private_key: string;
  token_uri?: string;
};

type DateRange = {
  startDate: string;
  endDate: string;
};

type SearchAnalyticsRow = {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
};

type GscRow = {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type ComparedGscRow = GscRow & {
  previousClicks: number;
  previousImpressions: number;
  previousCtr: number;
  previousPosition: number;
  deltaClicks: number;
  deltaImpressions: number;
  deltaCtr: number;
  deltaPosition: number;
};

type Ga4Row = {
  landingPage: string;
  sessions: number;
  activeUsers: number;
  engagedSessions: number;
  engagementRate: number;
};

type ComparedGa4Row = Ga4Row & {
  previousSessions: number;
  previousActiveUsers: number;
  previousEngagedSessions: number;
  previousEngagementRate: number;
  deltaSessions: number;
  deltaActiveUsers: number;
  deltaEngagedSessions: number;
  deltaEngagementRate: number;
};

export type SeoOpportunity = {
  kind: "striking_distance" | "low_ctr" | "growth" | "decline";
  key: string;
  score: number;
  reason: string;
  current: Pick<GscRow, "clicks" | "impressions" | "ctr" | "position">;
  previous: Pick<GscRow, "clicks" | "impressions" | "ctr" | "position">;
  ga4?: Pick<ComparedGa4Row, "sessions" | "engagedSessions" | "engagementRate" | "deltaSessions">;
};

function base64Url(value: string | Buffer): string {
  const buffer = typeof value === "string" ? Buffer.from(value) : value;
  return buffer
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}

export function buildComparisonRanges(now = new Date()): {
  current: DateRange;
  previous: DateRange;
} {
  // Search Console puede tardar varios días en cerrar datos. Terminamos hace 3 días
  // para comparar ventanas completas y evitar decisiones por datos parciales.
  const currentEnd = addDays(
    new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())),
    -3,
  );
  const currentStart = addDays(currentEnd, -27);
  const previousEnd = addDays(currentStart, -1);
  const previousStart = addDays(previousEnd, -27);

  return {
    current: { startDate: isoDate(currentStart), endDate: isoDate(currentEnd) },
    previous: { startDate: isoDate(previousStart), endDate: isoDate(previousEnd) },
  };
}

function parseServiceAccount(): ServiceAccount {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (!raw) {
    throw new Error("missing GOOGLE_SERVICE_ACCOUNT_JSON");
  }

  let parsed: ServiceAccount;
  try {
    parsed = JSON.parse(raw) as ServiceAccount;
  } catch {
    throw new Error("invalid GOOGLE_SERVICE_ACCOUNT_JSON");
  }

  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("incomplete GOOGLE_SERVICE_ACCOUNT_JSON");
  }

  return parsed;
}

async function getGoogleAccessToken(): Promise<string> {
  const serviceAccount = parseServiceAccount();
  const tokenUri = serviceAccount.token_uri || GOOGLE_TOKEN_URI;
  const issuedAt = Math.floor(Date.now() / 1000);

  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(
    JSON.stringify({
      iss: serviceAccount.client_email,
      scope: GOOGLE_SCOPES.join(" "),
      aud: tokenUri,
      iat: issuedAt,
      exp: issuedAt + 3600,
    }),
  );

  const unsigned = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const signature = signer.sign(serviceAccount.private_key);

  const assertion = `${unsigned}.${base64Url(signature)}`;

  const response = await fetch(tokenUri, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`google token exchange failed (${response.status}): ${body.slice(0, 300)}`);
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("google token exchange returned no access_token");
  }

  return data.access_token;
}

function mapGscRows(rows: SearchAnalyticsRow[] | undefined): GscRow[] {
  return (rows || []).map((row) => ({
    key: (row.keys || []).join(" | "),
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  }));
}

async function fetchGscDimension(
  accessToken: string,
  siteUrl: string,
  range: DateRange,
  dimensions: string[],
): Promise<GscRow[]> {
  const endpoint =
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      ...range,
      dimensions,
      type: "web",
      aggregationType: "auto",
      rowLimit: 25000,
      startRow: 0,
      dataState: "final",
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`gsc query failed (${response.status}): ${body.slice(0, 500)}`);
  }

  const data = (await response.json()) as { rows?: SearchAnalyticsRow[] };
  return mapGscRows(data.rows);
}

function compareGsc(current: GscRow[], previous: GscRow[]): ComparedGscRow[] {
  const previousByKey = new Map(previous.map((row) => [row.key, row]));

  return current.map((row) => {
    const prev = previousByKey.get(row.key);
    const previousClicks = prev?.clicks || 0;
    const previousImpressions = prev?.impressions || 0;
    const previousCtr = prev?.ctr || 0;
    const previousPosition = prev?.position || 0;

    return {
      ...row,
      previousClicks,
      previousImpressions,
      previousCtr,
      previousPosition,
      deltaClicks: row.clicks - previousClicks,
      deltaImpressions: row.impressions - previousImpressions,
      deltaCtr: row.ctr - previousCtr,
      // Negativo = mejora (la posición numérica baja).
      deltaPosition: previousPosition ? row.position - previousPosition : 0,
    };
  });
}

function normalizeLanding(value: string): string {
  if (!value || value === "(not set)") return "/";
  const clean = value.split("?")[0] || "/";
  return clean.startsWith("/") ? clean : `/${clean}`;
}

function metricNumber(values: Array<{ value?: string }> | undefined, index: number): number {
  const raw = values?.[index]?.value;
  if (!raw) return 0;
  const value = Number(raw);
  return Number.isFinite(value) ? value : 0;
}

async function fetchGa4LandingPages(
  accessToken: string,
  propertyId: string,
  range: DateRange,
): Promise<Ga4Row[]> {
  const endpoint = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      dateRanges: [{ startDate: range.startDate, endDate: range.endDate }],
      dimensions: [{ name: "landingPagePlusQueryString" }],
      metrics: [
        { name: "sessions" },
        { name: "activeUsers" },
        { name: "engagedSessions" },
        { name: "engagementRate" },
      ],
      dimensionFilter: {
        filter: {
          fieldName: "sessionDefaultChannelGroup",
          stringFilter: { matchType: "EXACT", value: "Organic Search" },
        },
      },
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: "10000",
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`ga4 runReport failed (${response.status}): ${body.slice(0, 500)}`);
  }

  const data = (await response.json()) as {
    rows?: Array<{
      dimensionValues?: Array<{ value?: string }>;
      metricValues?: Array<{ value?: string }>;
    }>;
  };

  return (data.rows || []).map((row) => ({
    landingPage: normalizeLanding(row.dimensionValues?.[0]?.value || "/"),
    sessions: metricNumber(row.metricValues, 0),
    activeUsers: metricNumber(row.metricValues, 1),
    engagedSessions: metricNumber(row.metricValues, 2),
    engagementRate: metricNumber(row.metricValues, 3),
  }));
}

function compareGa4(current: Ga4Row[], previous: Ga4Row[]): ComparedGa4Row[] {
  const previousByLanding = new Map(previous.map((row) => [row.landingPage, row]));

  return current.map((row) => {
    const prev = previousByLanding.get(row.landingPage);
    const previousSessions = prev?.sessions || 0;
    const previousActiveUsers = prev?.activeUsers || 0;
    const previousEngagedSessions = prev?.engagedSessions || 0;
    const previousEngagementRate = prev?.engagementRate || 0;

    return {
      ...row,
      previousSessions,
      previousActiveUsers,
      previousEngagedSessions,
      previousEngagementRate,
      deltaSessions: row.sessions - previousSessions,
      deltaActiveUsers: row.activeUsers - previousActiveUsers,
      deltaEngagedSessions: row.engagedSessions - previousEngagedSessions,
      deltaEngagementRate: row.engagementRate - previousEngagementRate,
    };
  });
}

function pathnameFromGscKey(key: string): string {
  try {
    return new URL(key).pathname || "/";
  } catch {
    return key.startsWith("/") ? key : `/${key}`;
  }
}

function pct(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function buildPageOpportunities(
  pages: ComparedGscRow[],
  ga4Rows: ComparedGa4Row[],
): SeoOpportunity[] {
  const ga4ByPath = new Map(ga4Rows.map((row) => [row.landingPage, row]));
  const opportunities: SeoOpportunity[] = [];

  for (const row of pages) {
    const path = pathnameFromGscKey(row.key);
    const ga4 = ga4ByPath.get(path);
    const current = {
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    };
    const previous = {
      clicks: row.previousClicks,
      impressions: row.previousImpressions,
      ctr: row.previousCtr,
      position: row.previousPosition,
    };
    const ga4Summary = ga4
      ? {
          sessions: ga4.sessions,
          engagedSessions: ga4.engagedSessions,
          engagementRate: ga4.engagementRate,
          deltaSessions: ga4.deltaSessions,
        }
      : undefined;

    if (row.impressions >= 5 && row.position >= 4.5 && row.position <= 20) {
      const score = row.impressions * Math.max(1, 21 - row.position);
      opportunities.push({
        kind: "striking_distance",
        key: row.key,
        score,
        reason: `Está en posición ${row.position.toFixed(1)} con ${row.impressions} impresiones: ya existe demanda y margen real para acercarla al top 10.`,
        current,
        previous,
        ga4: ga4Summary,
      });
    }

    if (row.impressions >= 10 && row.position <= 12 && row.ctr < 0.04) {
      const score = row.impressions * (0.04 - row.ctr + 0.01) * 100;
      opportunities.push({
        kind: "low_ctr",
        key: row.key,
        score,
        reason: `CTR de ${pct(row.ctr)} con posición ${row.position.toFixed(1)}: revisar title, descripción e intención de búsqueda puede capturar clics sin necesitar más impresiones.`,
        current,
        previous,
        ga4: ga4Summary,
      });
    }

    if (
      row.impressions >= 5 &&
      row.deltaImpressions > 0 &&
      (row.deltaClicks > 0 || row.deltaImpressions >= 10)
    ) {
      const score = row.deltaImpressions * 2 + Math.max(0, row.deltaClicks) * 20;
      opportunities.push({
        kind: "growth",
        key: row.key,
        score,
        reason: `Gana ${row.deltaImpressions} impresiones y ${row.deltaClicks} clics frente a la ventana anterior: conviene reforzarla mientras Google la está probando.`,
        current,
        previous,
        ga4: ga4Summary,
      });
    }

    if (
      row.previousImpressions >= 10 &&
      row.deltaImpressions <= -5 &&
      row.deltaClicks < 0
    ) {
      const score = Math.abs(row.deltaImpressions) * 2 + Math.abs(row.deltaClicks) * 20;
      opportunities.push({
        kind: "decline",
        key: row.key,
        score,
        reason: `Pierde ${Math.abs(row.deltaImpressions)} impresiones y ${Math.abs(row.deltaClicks)} clics frente a la ventana anterior: revisar frescura, intención y competencia.`,
        current,
        previous,
        ga4: ga4Summary,
      });
    }
  }

  return opportunities
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}

function topRows(rows: ComparedGscRow[], limit = 20): ComparedGscRow[] {
  return [...rows]
    .sort((a, b) => {
      if (b.clicks !== a.clicks) return b.clicks - a.clicks;
      return b.impressions - a.impressions;
    })
    .slice(0, limit);
}

export async function buildSeoReport() {
  const accessToken = await getGoogleAccessToken();
  const siteUrl = process.env.GSC_SITE_URL?.trim() || "sc-domain:viajajapon.com";
  const ga4PropertyId = process.env.GA4_PROPERTY_ID?.trim() || "";
  const ranges = buildComparisonRanges();

  const [
    currentPages,
    previousPages,
    currentQueries,
    previousQueries,
  ] = await Promise.all([
    fetchGscDimension(accessToken, siteUrl, ranges.current, ["page"]),
    fetchGscDimension(accessToken, siteUrl, ranges.previous, ["page"]),
    fetchGscDimension(accessToken, siteUrl, ranges.current, ["query"]),
    fetchGscDimension(accessToken, siteUrl, ranges.previous, ["query"]),
  ]);

  const comparedPages = compareGsc(currentPages, previousPages);
  const comparedQueries = compareGsc(currentQueries, previousQueries);

  let ga4: {
    status: "ok" | "not_configured" | "error";
    propertyId?: string;
    error?: string;
    landingPages: ComparedGa4Row[];
  } = {
    status: "not_configured",
    landingPages: [],
  };

  if (ga4PropertyId) {
    try {
      const [currentGa4, previousGa4] = await Promise.all([
        fetchGa4LandingPages(accessToken, ga4PropertyId, ranges.current),
        fetchGa4LandingPages(accessToken, ga4PropertyId, ranges.previous),
      ]);
      ga4 = {
        status: "ok",
        propertyId: ga4PropertyId,
        landingPages: compareGa4(currentGa4, previousGa4),
      };
    } catch (error) {
      ga4 = {
        status: "error",
        propertyId: ga4PropertyId,
        error: error instanceof Error ? error.message : "unknown ga4 error",
        landingPages: [],
      };
    }
  }

  const totals = (rows: GscRow[]) =>
    rows.reduce(
      (acc, row) => {
        acc.clicks += row.clicks;
        acc.impressions += row.impressions;
        return acc;
      },
      { clicks: 0, impressions: 0 },
    );

  const currentTotals = totals(currentPages);
  const previousTotals = totals(previousPages);

  return {
    generatedAt: new Date().toISOString(),
    siteUrl,
    ranges,
    summary: {
      currentClicks: currentTotals.clicks,
      previousClicks: previousTotals.clicks,
      deltaClicks: currentTotals.clicks - previousTotals.clicks,
      currentImpressions: currentTotals.impressions,
      previousImpressions: previousTotals.impressions,
      deltaImpressions: currentTotals.impressions - previousTotals.impressions,
      // Nota: al sumar filas por página, los clics e impresiones son útiles para tendencia,
      // pero Search Console puede truncar datos a las filas principales.
      dataCaveat:
        "Search Console no garantiza devolver todas las filas; este informe usa las filas disponibles y ventanas finalizadas.",
    },
    opportunities: buildPageOpportunities(comparedPages, ga4.landingPages),
    topPages: topRows(comparedPages, 20),
    topQueries: topRows(comparedQueries, 20),
    ga4: {
      status: ga4.status,
      propertyId: ga4.propertyId,
      error: ga4.error,
      topOrganicLandingPages: [...ga4.landingPages]
        .sort((a, b) => b.sessions - a.sessions)
        .slice(0, 20),
    },
  };
}
