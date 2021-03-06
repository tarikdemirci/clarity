/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

// tslint:disable no-var-imports no-var-requires no-require-imports variable-name
const UiBasic = require('raw-loader!./ui/basic.html');
const UiFull = require('raw-loader!./ui/full.html');
const UiError = require('raw-loader!./ui/error.html');
const UiInline = require('raw-loader!./ui/inline.html');
const UiDisabled = require('raw-loader!./ui/disabled.html');

const NgBasic = require('raw-loader!./ng/basic.html');
const NgLabel = require('raw-loader!./ng/label.html');
const NgHelpers = require('raw-loader!./ng/helpers.html');
const NgInline = require('raw-loader!./ng/inline.html');
const NgDisabled = require('raw-loader!./ng/disabled.html');
const NgIndeterminate = require('raw-loader!./ng/indeterminate.html');

@Component({
  templateUrl: './checkboxes.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
})
export class CheckboxesDemo extends ClarityDocComponent {
  constructor() {
    super('checkboxes');
  }

  exampleOne = {
    one: false,
    two: false,
  };
  exampleTwo = {
    one: false,
    two: false,
  };
  exampleThree = {
    one: false,
    two: false,
  };
  exampleFour = '';

  uiBasic: any = UiBasic;
  uiFull: any = UiFull;
  uiError: any = UiError;
  uiInline: any = UiInline;
  uiDisabled: any = UiDisabled;

  ngBasic: any = NgBasic;
  ngLabel: any = NgLabel;
  ngHelpers: any = NgHelpers;
  ngInline: any = NgInline;
  ngDisabled: any = NgDisabled;
  ngIndeterminate: any = NgIndeterminate;

  indeterminateState = true;
}
