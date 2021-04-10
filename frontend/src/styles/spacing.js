import {scaleSize} from './mixins';

let SPACINGS = {}

for(let i = 1; i <= 100; i++){
    SPACINGS['SCALE_'+i] = scaleSize(i)
}

export default SPACINGS