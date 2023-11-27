// Copyright Sebastian Wiesner <sebastian@swsnr.de>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//
// Alternatively, the contents of this file may be used under the terms
// of the GNU General Public License Version 2 or later, as described below:
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

interface String {
  // GNOME Shell pollutes the String prototype with its own format function
  format(...args: unknown[]): string;
}

interface ImportMeta {
  /** GNOME Shell/GJS add the imported URL here */
  readonly url: string;
}
/* eslint-disable @typescript-eslint/no-explicit-any */

declare function log(message: any): void;
declare function logError(err: Error, message?: string): void;
declare interface IExtension {
	enable(): void,
	disable(): void;
}

declare interface ISubExtension {
	apply?(): void,
	destroy(): void;
}

declare interface Math {
	clamp(num: number, min: number, max: number): number;
}

// types
declare type KeysOfType<T, U> = { [P in keyof T]: T[P] extends U ? P : never; }[keyof T];
declare type KeysThatStartsWith<K extends string, U extends string> = K extends `${U}${infer _R}` ? K : never;
