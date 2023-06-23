
export class MarkdownParser {
    parseTOC(markdown: string): string {
        let TOC = "";
        let lines = markdown.split("\n");
    
        lines.forEach(line => {
            // Regular expression to match markdown headings. 
            // The expression matches lines starting with # (hash) symbol.
            let match = line.match(/^#{1,6}\s(.*)/);
            if (match) {
                // If a match is found, append the heading to the TOC.
                TOC += match[0] + "\n";
            }
        });
        return TOC;
    }

}