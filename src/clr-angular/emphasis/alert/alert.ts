/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectorRef, Component, EventEmitter, Input, Optional, Output } from '@angular/core';

// providers
import { AlertIconAndTypesService } from './providers/icon-and-types.service';
import { MultiAlertService } from './providers/multi-alert.service';
import { isBooleanAttributeSet } from '../../utils/component/is-boolean-attribute-set';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'clr-alert',
  providers: [AlertIconAndTypesService],
  templateUrl: './alert.html',
  styles: [':host { display: block; }'],
})
export class ClrAlert {
  constructor(
    private iconService: AlertIconAndTypesService,
    private cdr: ChangeDetectorRef,
    @Optional() private multiAlertService: MultiAlertService,
    private commonStrings: ClrCommonStringsService
  ) {}

  @Input('clrAlertSizeSmall') isSmall: boolean = false;
  @Input('clrAlertClosable') closable: boolean = true;
  @Input('clrAlertAppLevel') isAppLevel: boolean = false;

  // Aria
  @Input() clrCloseButtonAriaLabel: string = this.commonStrings.keys.alertCloseButtonAriaLabel;

  @Input('clrAlertClosed') _closed: boolean = false;
  @Output('clrAlertClosedChange') _closedChanged: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  @Input('clrAlertType')
  set alertType(val: string) {
    this.iconService.alertType = val;
  }
  get alertType(): string {
    return this.iconService.alertType;
  }

  /**
   * clrPolite is not used in the code. Is here just to provide
   * code complition and also mark component what type AriaLive
   * will be used.
   */
  @Input('clrPolite') polite: boolean = true;
  @Input('clrAssertive') assertive: boolean;
  @Input('clrOff') off: boolean;
  /**
   * There is an order on how the attributes will take effect.
   * Assertive, Off, Polite.
   *
   * Polite is default if non is passed.
   *
   * In the case of setting all of them to true. Assertive will be used.
   *
   */
  get setAriaLive(): string {
    if (isBooleanAttributeSet(this.assertive)) {
      return 'assertive';
    }
    if (isBooleanAttributeSet(this.off)) {
      return 'off';
    }
    return 'polite';
  }

  @Input('clrAlertIcon')
  set alertIconShape(value: string) {
    this.iconService.alertIconShape = value;
  }

  get alertClass(): string {
    return this.iconService.iconInfoFromType(this.iconService.alertType).cssClass;
  }

  private _hidden: boolean;

  set hidden(value: boolean) {
    if (value !== this._hidden) {
      this._hidden = value;
      this.cdr.detectChanges();
    }
  }

  get hidden() {
    return this._hidden;
  }

  private subscriptions: Subscription[] = [];

  ngOnInit() {
    if (this.multiAlertService) {
      this.subscriptions.push(
        this.multiAlertService.changes.subscribe(() => {
          this.hidden = this.multiAlertService.currentAlert !== this;
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  close(): void {
    if (!this.closable) {
      return;
    }
    this._closed = true;
    if (this.multiAlertService) {
      this.multiAlertService.close();
    }
    this._closedChanged.emit(true);
  }

  open(): void {
    this._closed = false;
    this._closedChanged.emit(false);
  }
}
