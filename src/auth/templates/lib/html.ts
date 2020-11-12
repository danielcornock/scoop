export function html(content: string): string {
  return `<html style="font-family: Arial, Helvetica, sans-serif">
  <body style="margin: 0; background-color: rgb(239, 242, 252)">
    <div style="max-width: 800px; width: 100%; margin: 0 auto; background-color: white;">
      <div style="background-color: #3657dc; padding: 50px;">
        <img src="https://app.scoopfinance.co.uk/assets/images/scoop-email.png" style="width: 200px; margin: 0 auto; display: block;"/>
      </div>
      <div style="padding: 12px 20px; min-height: 100%; line-height: 170%;">
        ${content}
      </div>
    </div>
  </body>
</html>`;
}
