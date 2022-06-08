export async function fileToBase64(url: string) {
    const req = await fetch(url);

    const blob = await req.blob();

    return new Promise<string>((res, rej) => {
        const reader = new FileReader()
        reader.addEventListener('loadend', () => {
            res(reader.result as string);
        });
        reader.addEventListener('error', rej);
        
        reader.readAsDataURL(blob);
    });
}

export async function embedNodeRemoteSource(node: HTMLElement | SVGElement, clonedNode: HTMLElement | SVGElement) {
    switch(node.tagName) {
        case 'IMG': {
            const url = (node as HTMLImageElement).src;

            const base64Url = await fileToBase64(url);

            (clonedNode as HTMLImageElement).src = base64Url;
            break;
        }
    }
    
} 