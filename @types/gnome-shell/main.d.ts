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
    _gestureUpdate(tracker: swipeTracker.SwipeTracker, progress: number);
    _gestureEnd(tracker: swipeTracker.SwipeTracker, duration: number, endProgress: number);

    _swipeTracker: swipeTracker.SwipeTracker;
};

declare const layoutManager: GObject.Object & {
    uiGroup: St.Widget,
    panelBox: St.BoxLayout,
    monitors: __shell_private_types.IMonitorState[],
    primaryMonitor: __shell_private_types.IMonitorState,
    currentMonitor: __shell_private_types.IMonitorState,
    getWorkAreaForMonitor: (index: number) => Mtk.Rectangle,

    connect(id: 'monitors-changed', callback: () => void);
};

declare const wm: {
    skipNextEffect(actor: Meta.WindowActor): void;
    _workspaceAnimation: workspaceAnimation.WorkspaceAnimationController;
};

declare const osdWindowManager: {
    hideAll(): void;
};