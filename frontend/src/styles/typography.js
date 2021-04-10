import { scaleFont } from './mixins';

let FONTSIZE = {}

for(let i = 1; i <= 100; i++){
    FONTSIZE['FONT_SIZE_'+i] = scaleFont(i)
}

export default FONTSIZE

