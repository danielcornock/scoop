export function addCustomStyles(html: string): string {
  return html.replace(h2Base, h2WithStyles).replace(breakLine, '');
}

const h2Base = /<h2>/g;
const h2WithStyles = '<h2 style="margin-top: 40px; color: #3657dc">';

const breakLine = /<p><br><\/p>/g;
