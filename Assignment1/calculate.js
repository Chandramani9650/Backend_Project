const crypto = require('crypto')
const args = process.argv.slice(2)
const task = args[0]

function calculate(task, args){
    switch (task) {
        case 'add':
            if (args.length<2) {
                console.log('please enter atleast to number');
                break
            }
            let sum =args.reduce((acc, val) => acc + parseFloat(val), 0);
            console.log(sum);
            break;
        case 'sub':
            if (args.length<2) {
                console.log('please enter atleast to number');
                break 
            }
            let sub = args.reduce((acc, val)=>acc-parseFloat(val))
            console.log(sub);
            break;
        case 'mult':
            if (args.length<2) {
                console.log('please enter atleast to number');
                break   
            }
            let multiplication = args.reduce((acc, val)=>acc*parseFloat(val))
            console.log(multiplication);
            break;
            case 'division':
                if (args.length<2) {
                    console.log('please enter atleast to number');
                    break    
                }
                let division = args.reduce((acc, val)=>acc/parseFloat(val))
                console.log(division); 
            case 'sin':
                if (args.length!==1) {
                    console.log('please enter only single digit');
                    break
                }
                let resultsin = Math.sin(parseFloat(args[0]))
                console.log(resultsin);
                break
                case 'cos':
                    if (args.length!==1) {
                        console.log('please enter only single digit');
                        break
                    }
                    let resultcos = Math.cos(parseFloat(args[0]))
                    console.log(resultcos);
                    break
                    case 'tan':
                        if (args.length!==1) {
                            console.log('please enter only single digit');
                            break
                        }
                        let resulttan = Math.tan(parseFloat(args[0]))
                        console.log(resulttan);
                        
                        break
                    case 'random':
                        const size = parseInt(args[0])
                        if (isNaN(size) || size<=0) {
                            console.log('you have enter invalid size');
                            break
                        }
                        let randomNum = crypto.randomBytes(size)
                        let ans = randomNum.toString('base64')
                        console.log(ans);
                        break

        default:
            console.log('You have enterd wrong option');
            break;
    }
}
calculate(task, args.slice(1))