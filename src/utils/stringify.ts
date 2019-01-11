import * as BigNumber from '../../node_modules/big-integer';

export default (item: any) => {
    if (BigNumber.isInstance(item)) {
        return item.toString(16);
    } else if (item.wrapped) {
        return item.toString();
    } else {
        return '(' + item.toString() + ')';
    }
};
