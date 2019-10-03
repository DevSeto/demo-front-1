export class InitJsScriptsService {

    public static displayedElementTwins: boolean = !!0;

    public static displayedElement(elementName: string, event: any, outside?: boolean): void {
        const currentElement: any = document.getElementsByClassName(elementName)[0],
            currentDisplay: number = currentElement.style.display.length;

        if (outside) {
            if (currentDisplay >= 5)
                currentElement.style.display = 'none';
        } else {
            event.stopImmediatePropagation();

            if (currentDisplay < 5)
                currentElement.style.display = 'block';
            else
                currentElement.style.display = 'none';
        }
    }
}