/* eslint-disable no-mixed-spaces-and-tabs */
import Clutter from '../gir-generated/clutter-13';
import GObject from '../gir-generated/gobject-2.0';
import Meta from '../gir-generated/meta-13';
import Mtk from '../gir-generated/mtk-13';
import Shell from '../gir-generated/shell-13';
import St from '../gir-generated/st-13';


declare const global: Shell.Global;

declare namespace __shell_private_types {
  class TouchpadGesture extends GObject.Object {
  	destroy(): void;
  	_handleEvent(actor: Clutter.Actor | undefined, event: CustomEventType): boolean;
  }

  interface IMonitorState {
    x: number,
    y: number,
    width: number,
    height: number,
    geometry_scale: number,
    index: number,
    inFullscreen: () => boolean,
  }
}

declare const actionMode: Shell.ActionMode;
declare function notify(message: string): void;
declare function activateWindow(window: Meta.Window, time?: number, workspaceNum?: number): void;

declare const panel: {
    addToStatusArea(role: string, indicator: Clutter.Actor, position?: number, box?: string): void,
} & Clutter.Actor;

declare const overview: {
    dash: {
        showAppsButton: St.Button
    };
    searchEntry: St.Entry,
    shouldToggleByCornerOrButton(): boolean,
    visible: boolean,
    show(): void,
    hide(): void,
    showApps(): void,
    connect(signal: 'showing' | 'hiding' | 'hidden' | 'shown', callback: () => void): number,
    disconnect(id: number): void,
    _overview: {
        _controls: overviewControls.OverviewControlsManager
    } & St.Widget
    _gestureBegin(tracker: {
        confirmSwipe: typeof swipeTracker.SwipeTracker.prototype.confirmSwipe;
    }): void;
    _gestureUpdate(tracker: swipeTracker.SwipeTracker, progress: number): void;
    _gestureEnd(tracker: swipeTracker.SwipeTracker, duration: number, endProgress: number): void;

    _swipeTracker: swipeTracker.SwipeTracker;
};

declare const layoutManager: GObject.Object & {
    uiGroup: St.Widget,
    panelBox: St.BoxLayout,
    monitors: __shell_private_types.IMonitorState[],
    primaryMonitor: __shell_private_types.IMonitorState,
    currentMonitor: __shell_private_types.IMonitorState,
    getWorkAreaForMonitor: (index: number) => Mtk.Rectangle,

    connect(id: 'monitors-changed', callback: () => void): void;
};

declare const wm: {
    skipNextEffect(actor: Meta.WindowActor): void;
    _workspaceAnimation: workspaceAnimation.WorkspaceAnimationController;
};

declare const osdWindowManager: {
    hideAll(): void;
};

declare namespace overviewControls {
     enum ControlsState {
        HIDDEN,
        WINDOW_PICKER,
        APP_GRID
    }

    class OverviewAdjustment extends St.Adjustment {
    	getStateTransitionParams(): {
            initialState: ControlsState,
            finalState: ControlsState
            currentState: number,
            progress: number
        }
    }

    class OverviewControlsManager extends St.Widget {
    	_stateAdjustment: OverviewAdjustment;
    	layoutManager: Clutter.BoxLayout & {
            _searchEntry: St.Bin
        };

    	_toggleAppsPage(): void

    	_workspacesDisplay: {
            _swipeTracker: swipeTracker.SwipeTracker
        };

    	_appDisplay: {
            _swipeTracker: swipeTracker.SwipeTracker
        };

    	_searchController: {
            searchActive: boolean
        };
    }
}

declare namespace swipeTracker {
    class SwipeTracker extends GObject.Object {
    	orientation: Clutter.Orientation;
    	enabled: boolean;
    	allowLongSwipes: boolean;
    	confirmSwipe(distance: number, snapPoints: number[], currentProgress: number, cancelProgress: number): void;
    	destroy(): void;

    	_touchGesture?: Clutter.GestureAction;
    	_touchpadGesture?: __shell_private_types.TouchpadGesture;
    	// custom
    	__oldTouchpadGesture?: __shell_private_types.TouchpadGesture;
    	//
    	_allowedModes: Shell.ActionMode;

    	_progress: number;
    	_beginGesture(): void;
    	_updateGesture(): void;
    	_endTouchpadGesture(): void;
    	_history: {
            reset(): void;
        };
    }
}

declare namespace panelMenu {
    class Button extends St.Widget {
    	constructor(menuAlignment: number, nameText?: string, dontCreateMenu?: boolean);
    	container: St.Bin;
    	menu: popupMenu.PopupMenuItem;
    }
}

declare namespace popupMenu {
    class PopupMenuItem extends St.BoxLayout {
    	constructor(text: string);
    	addMenuItem(subMenu: PopupMenuItem): void;
    }
}

declare namespace workspaceAnimation {
    class WorkspaceAnimationController {
    	_swipeTracker: swipeTracker.SwipeTracker;
    	_switchWorkspaceBegin(tracker: {
            orientation: Clutter.Orientation,
            confirmSwipe: typeof swipeTracker.SwipeTracker.prototype.confirmSwipe
        }, monitor: number): void;

    	_switchWorkspaceUpdate(tracker: swipeTracker.SwipeTracker, progress: number): void;
    	_switchWorkspaceEnd(tracker: swipeTracker.SwipeTracker, duration: number, progress: number): void;

    	movingWindow: Meta.Window | undefined;
    }
}

declare namespace layout {
    class MonitorConstraint extends Clutter.Constraint {
    	constructor(params: Partial<{ primary: boolean, index: number }>);
    }
}

declare namespace misc {
    namespace util {
        function spawn(argv: string[]): void;
        function lerp(start: number, end: number, progress: number): number;
    }
}

declare namespace ui {
    namespace altTab {
        class WindowSwitcherPopup extends St.Widget {
        	_items: St.Widget & {
                window: Meta.Window
            }[];

        	_switcherList: St.Widget & {
                _scrollView: {
                    hscroll: {
                        adjustment: St.Adjustment
                    }
                }
            };
            
        	_select(n: number): void;
        	_resetNoModsTimeout(): void;
        	_popModal(): void;

        	_noModsTimeoutId: number;
        	_initialDelayTimeoutId: number;
        	_selectedIndex: number;

        	show(backward: boolean, binding: string, mask: number): void;
        }
    }
}

// types
export type CustomEventType = Pick<
	Clutter.Event,
	'type' | 'get_gesture_phase' |
	'get_touchpad_gesture_finger_count' | 'get_time' |
	'get_coords' | 'get_gesture_motion_delta_unaccelerated' |
	'get_gesture_pinch_scale' | 'get_gesture_pinch_angle_delta'
>;