
import Clutter from '../gir-generated/clutter-13';

export namespace Layout {
    class MonitorConstraint extends Clutter.Constraint {
        constructor(params: Partial<{ primary: boolean, index: number }>);
    }
}