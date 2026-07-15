import { DEFAULT_FX } from "@/data/jrpass";

export const dynamic = "force-static";

export async function GET() {
  const rate = DEFAULT_FX;

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Cambio yen-euro · ViajaJapón</title>
<style>
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;background:#f9fafb;color:#111827}
.w{max-width:340px;margin:0 auto;padding:16px;background:#fff;border:1px solid #e5e7eb;border-radius:12px}
.k{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#6b7280;font-weight:600;margin:0}
.rate{font-size:26px;font-weight:700;margin:4px 0 14px;font-variant-numeric:tabular-nums}
label{display:block;font-size:12px;color:#4b5563;margin-bottom:4px}
.row{margin-bottom:10px}
input{width:100%;font-size:18px;padding:8px 10px;border:1px solid #e5e7eb;border-radius:8px;font-variant-numeric:tabular-nums}
input:focus{outline:2px solid #e53e3e;outline-offset:1px}
.f{font-size:11px;color:#6b7280;margin:8px 0 0}
.f a{color:#e53e3e;font-weight:600;text-decoration:none}
</style>
</head>
<body>
<div class="w">
  <p class="k">Cambio de referencia</p>
  <p class="rate" id="r-disp">1 € = ¥${rate}</p>
  <div class="row"><label for="e">Euros (€)</label><input id="e" type="number" inputmode="decimal" value="100" min="0"></div>
  <div class="row"><label for="y">Yenes (¥)</label><input id="y" type="number" inputmode="decimal" min="0"></div>
  <p class="f" id="d-disp">Actualizado estimado · ref. BCE. Fuente: <a href="https://viajajapon.com/cambio-yen-euro" target="_blank" rel="noopener">ViajaJapón</a></p>
</div>
<script>
(function(){
  var R=${rate},e=document.getElementById('e'),y=document.getElementById('y');
  var rd=document.getElementById('r-disp'), dd=document.getElementById('d-disp');
  function fromE(){var v=parseFloat(e.value);y.value=isFinite(v)?Math.round(v*R):'';}
  function fromY(){var v=parseFloat(y.value);e.value=isFinite(v)?Math.round(v/R*100)/100:'';}
  e.addEventListener('input',fromE);
  y.addEventListener('input',fromY);
  fromE();
  
  fetch('https://api.frankfurter.dev/v1/latest?base=EUR&symbols=JPY')
    .then(r => r.json())
    .then(data => {
       if (data && data.rates && data.rates.JPY) {
         R = Math.round(data.rates.JPY * 100) / 100;
         rd.innerText = '1 € = ¥' + R;
         dd.innerHTML = 'Actualizado ' + data.date + ' · ref. BCE. Fuente: <a href="https://viajajapon.com/cambio-yen-euro" target="_blank" rel="noopener">ViajaJapón</a>';
         fromE();
       }
    }).catch(function(){});
})();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Frame-Options": "ALLOWALL",
    },
  });
}
