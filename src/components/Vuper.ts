import '@/styles/vuper.scss';

export interface VuperOptions {
    root: string;
    fullscreen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export class Vuper {
    private Options: VuperOptions;
    private rootSelector: string;
    private elementSelector: string;
    private isFullscreen: boolean;

    private VuperRootBlockElement: HTMLElement | null;
    private VuperBlockElement: HTMLElement | null;
    private VuperOverlayDiv: HTMLElement;
    private VuperModalDiv: HTMLElement | null;
    private VuperDividerDiv: HTMLElement | null;

    private isDragging: boolean = false;
    private startY: number = 0;
    private currentY: number = 0;

    constructor(elementSelector: string, options: VuperOptions) {
        this.Options = options;
        this.rootSelector = options.root ?? '#app';
        this.elementSelector = elementSelector;
        this.isFullscreen = options.fullscreen ?? false;

        this.VuperRootBlockElement = document.querySelector(this.rootSelector);
        this.VuperRootBlockElement?.classList.add('vuper-main');

        this.VuperBlockElement = document.querySelector(this.elementSelector);

        this.VuperOverlayDiv = document.createElement('div');
        this.VuperOverlayDiv.classList.add('vuper-overlay');

        this.VuperDividerDiv = document.createElement('div');
        this.VuperDividerDiv.classList.add('vuper-wrapper--divider');

        this.VuperOverlayDiv.addEventListener('click', this.closeModal.bind(this));

        this.VuperModalDiv = this.VuperBlockElement!.querySelector('.vuper-wrapper');

        this.VuperBlockElement?.append(this.VuperOverlayDiv);
        this.VuperModalDiv?.append(this.VuperDividerDiv);

        if (this.isFullscreen) {
            this.VuperModalDiv!.classList.add('vuper-wrapper--fullscreen');
        }

        // Слушатели событий для мыши
        this.VuperDividerDiv.addEventListener('mousedown', this.startDrag.bind(this));
        document.addEventListener('mousemove', this.onDrag.bind(this));
        document.addEventListener('mouseup', this.endDrag.bind(this));

        // Слушатели событий для touch
        this.VuperDividerDiv.addEventListener('touchstart', this.startTouchDrag.bind(this));
        document.addEventListener('touchmove', this.onTouchDrag.bind(this));
        document.addEventListener('touchend', this.endTouchDrag.bind(this));
    }

    closeModal() {
        document.body.style.background = 'white';
        document.body.style.overflow = 'auto';

        this.VuperRootBlockElement!.classList.remove('vuper-main--open');

        this.VuperModalDiv!.classList.remove('vuper-wrapper--open');
        this.VuperModalDiv!.classList.add('vuper-wrapper--close');

        this.VuperOverlayDiv!.classList.remove('vuper-overlay--open');

        this.reInitDraggin();

        this.Options.onClose();
    }

    openModal() {
        document.body.style.overflow = 'hidden';
        document.body.style.background = 'black';

        this.VuperRootBlockElement!.classList.add('vuper-main--open');

        this.VuperModalDiv!.classList.remove('vuper-wrapper--close');
        this.VuperModalDiv!.classList.add('vuper-wrapper--open');

        this.VuperOverlayDiv!.classList.add('vuper-overlay--open');

        this.reInitDraggin();

        this.Options.onOpen();
    }

    reInitDraggin() {
        this.isDragging = false;
        this.startY = 0;
        this.currentY = 0;

        // Возвращаем модалку на место
        this.VuperModalDiv!.style.transform = 'translateY(0)';
    }

    startDrag(event: MouseEvent) {
        console.log('startDrag');
        this.isDragging = true;
        this.startY = event.clientY;
        this.VuperModalDiv!.classList.add('dragging');
    }

    // Перетаскивание мышью
    onDrag(event: MouseEvent) {
        if (!this.isDragging) return;

        this.currentY = event.clientY - this.startY;

        if (this.currentY > 0) {
            this.VuperModalDiv!.style.transform = `translateY(${this.currentY}px)`;
        }
    }

    endDrag() {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.VuperModalDiv!.classList.remove('dragging');

        // Закрытие модалки при перетаскивании ниже определенного порога
        if (this.currentY > 200) {
            // Порог в 200px (можно изменить)
            this.closeModal();
        } else {
            // Возвращаем модалку на место
            this.VuperModalDiv!.style.transform = 'translateY(0)';
        }
    }

    // Начало перетаскивания на мобильных устройствах
    startTouchDrag(event: TouchEvent) {
        this.isDragging = true;

        // Берем координату первого касания
        this.startY = event.touches[0].clientY;
        this.VuperModalDiv!.classList.add('dragging');
    }

    // Перетаскивание на мобильных устройствах
    onTouchDrag(event: TouchEvent) {
        if (!this.isDragging) return;

        // Разница между начальным касанием и текущим положением
        this.currentY = event.touches[0].clientY - this.startY;

        if (this.currentY > 0) {
            this.VuperModalDiv!.style.transform = `translateY(${this.currentY}px)`;
        }
    }

    // Окончание перетаскивания на мобильных устройствах
    endTouchDrag() {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.VuperModalDiv!.classList.remove('dragging');

        if (this.currentY > 200) {
            this.closeModal();
        } else {
            this.VuperModalDiv!.style.transform = 'translateY(0)';
        }
    }
}
