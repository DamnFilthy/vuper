import '@/styles/vuper.scss';

export interface VuperOptions {
    fullscreen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export class Vuper {
    private Options: VuperOptions;
    private elementId: string | number;
    private isFullscreen: boolean;
    private VuperBlockElement: HTMLElement | null;
    private VuperOverlayDiv: HTMLElement;
    private VuperModalDiv: HTMLElement | null;
    private VuperDividerDiv: HTMLElement | null;
    private isDragging: boolean = false;
    private startY: number = 0;
    private currentY: number = 0;

    constructor(id: string | number, options: VuperOptions) {
        this.Options = options;
        this.elementId = id;
        this.isFullscreen = options.fullscreen ?? false;
        this.VuperBlockElement = document.querySelector(`#${this.elementId}`);

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
        document.querySelector('.vuper-main')?.classList.remove('vuper-main--open');
        this.VuperModalDiv!.classList.remove('vuper-wrapper--open');
        this.VuperOverlayDiv!.classList.remove('vuper-overlay--open');
        document.body.style.overflow = 'auto';
        document.body.style.background = '';

        this.reInitDraggin();

        this.Options.onClose();
    }

    openModal() {
        document.querySelector('.vuper-main')?.classList.add('vuper-main--open');
        this.VuperModalDiv!.classList.add('vuper-wrapper--open');
        this.VuperOverlayDiv!.classList.add('vuper-overlay--open');
        document.body.style.overflow = 'hidden';
        document.body.style.background = 'black';

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
