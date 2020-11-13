export function addCustomStyles(html: string): string {
  return html
    .replace(h2Base, h2WithStyles)
    .replace(breakLine, '')
    .replace(aBase, aWithStyles);
}

const h2Base = /<h2>/g;
const h2WithStyles = '<h2 style="margin-top: 40px; color: #3657dc">';

const breakLine = /<p><br><\/p>/g;

const aBase = /<a /g;
const aWithStyles =
  '<a style="color: #3657dc; text-decoration: none; font-weight: 500;" ';
