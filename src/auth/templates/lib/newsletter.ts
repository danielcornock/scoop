import { addCustomStyles } from './add-custom-styles';

export function newsletter(content: string): string {
  return `${addCustomStyles(content)}
<div style="margin-top: 40px">As always, thank you for using our service!</div>
<div>The Scoop Team</div>`;
}
