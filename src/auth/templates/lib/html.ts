export function html(content: string): string {
  return `<html style="font-family: Arial, Helvetica, sans-serif">
  <body style="background-color: white;">
    <div style="max-width: 800px; width: 100%; margin: 0 auto;">
      <div style="background-color: #3657dc; padding: 30px; margin-bottom: 30px">
        <img src="https://app.scoopfinance.co.uk/assets/images/scoop-email.svg" style="width: 200px; margin: 0 auto; display: block;"/>
      </div>
      ${content}
    </div>
  </body>
</html>`;
}
