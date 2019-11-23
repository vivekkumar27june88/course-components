import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  CdkConnectedOverlay,
  ConnectedPosition,
  Overlay,
  ScrollStrategy,
  ViewportRuler
} from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  NgZone,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { take } from 'rxjs/operators';

let nextUniqueId = 0;

@Component({
  selector: 'ct-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CtSelectComponent),
      multi: true
    }
  ]
})
export class CtSelectComponent implements OnInit, ControlValueAccessor {
  @Output()
  change: EventEmitter<Array<any>>;

  @Input()
  options: Array<{ label: string; value: string }>;

  @Input()
  get value(): any {
    return this._value;
  }
  set value(newValue: any) {
    this._value = newValue;
  }

  @Input() panelClass: string | string[] | Set<string> | { [key: string]: any };

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    // this.stateChanges.next();
  }

  @Input()
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value || this._uid;
    // this.stateChanges.next();
  }

  get disabled() {
    return this._disabled;
  }
  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }

  get panelOpen(): boolean {
    return this._panelOpen;
  }

  public positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top'
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom'
    }
  ];
  public scrollStrategy: ScrollStrategy;
  public triggerRect: ClientRect;
  public offsetY = 0;

  @ViewChild('trigger', { static: false })
  trigger: ElementRef;
  @ViewChild(CdkConnectedOverlay, { static: true })
  overlayDir: CdkConnectedOverlay;
  @ViewChild('panel', { static: true })
  panel: ElementRef;

  private _uid = `ct-select-${nextUniqueId++}`;
  private _placeholder = '';
  private _required = false;
  private _disabled = false;
  private _panelOpen = false;
  private _id: string;
  private _value: any = [];

  /** `View -> model callback called when value changes` */
  onChange: (value: any) => void = () => {};
  /** `View -> model callback called when select has been touched` */
  onTouched = () => {};

  constructor(
    private overlay: Overlay,
    private viewportRuler: ViewportRuler,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.change = new EventEmitter<Array<any>>();
    this.scrollStrategy = overlay.scrollStrategies.reposition();
  }

  ngOnInit() {}

  /**
   * Sets the select's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   */
  writeValue(value: any): void {
    this.value = value;
  }

  /**
   * Saves a callback function to be invoked when the select's value
   * changes from user input. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Saves a callback function to be invoked when the select is blurred
   * by the user. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Disables the select. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.changeDetectorRef.markForCheck();
    // this.stateChanges.next();
  }

  toggle(): void {
    this.panelOpen ? this.close() : this.open();
  }

  close(): void {
    if (this._panelOpen) {
      this._panelOpen = false;
      // this._keyManager.withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr');
      // this._changeDetectorRef.markForCheck();
      // this._onTouched();
    }
  }

  open(): void {
    /* if (
      this.disabled ||
      !this.options ||
      !this.options.length ||
      this._panelOpen
    ) {
      return;
    } */

    this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
    // Note: The computed font-size will be a string pixel value (e.g. "16px").
    // `parseInt` ignores the trailing 'px' and converts this to a number.
    // this._triggerFontSize = parseInt(
    //   getComputedStyle(this.trigger.nativeElement).fontSize || '0'
    // );

    this._panelOpen = true;
    // this._keyManager.withHorizontalOrientation(null);
    // this._calculateOverlayPosition();
    // this._highlightCorrectOption();
    this.changeDetectorRef.markForCheck();

    // Set the font size on the panel element once it exists.
    // this.ngZone.onStable
    //   .asObservable()
    //   .pipe(take(1))
    //   .subscribe(() => {
    //     if (
    //       this._triggerFontSize &&
    //       this.overlayDir.overlayRef &&
    //       this.overlayDir.overlayRef.overlayElement
    //     ) {
    //       this.overlayDir.overlayRef.overlayElement.style.fontSize = `${this._triggerFontSize}px`;
    //     }
    //   });
  }

  /**
   * Callback that is invoked when the overlay panel has been attached.
   */
  onAttached(): void {
    this.overlayDir.positionChange.pipe(take(1)).subscribe(() => {
      this.changeDetectorRef.detectChanges();
      // this.calculateOverlayOffsetX();
      // this.panel.nativeElement.scrollTop = this.scrollTop;
    });
  }

  public hasOptionSelected(option): boolean {
    if (this.value && this.value.includes(option.value)) {
      return true;
    } else {
      return false;
    }
  }

  public checkboxChangeEventHandler(
    change: MatCheckboxChange,
    option: any
  ): void {
    if (change.checked === true) {
      this.value = [...this.value, option.value];
    } else {
      const pos = this.value.findIndex(item => item === option.value);
      if (pos !== -1) {
        this.value.splice(pos, 1);
        this.value = [...this.value];
      }
    }
    this.writeValue(this.value);
    this.onChange(this.value)
    this.change.emit(this.value);
  }
}
