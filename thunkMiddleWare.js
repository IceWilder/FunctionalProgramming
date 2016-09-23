const store = {
        getState() {
            return console.log('hava getState')
        },
        dispatch(action) {
            return console.log('dispatching.....', action)
        }
}

const reducer = {

}
const createStore = (reducer, initialState) => {
    console.log('createStore....')
    return store;
}
const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}
// const thunkMiddleWare

const crashReporter = store => next => action => {
        try {
            console.log('is trying.....')
            return next(action)
        } catch (err) {
            console.error('Caught an exception!', err)
            throw err
        }
    }
    //middleware后的结果等同于如下:
// const middlewareResult = action => {
//     console.log('dispatching', action)
//     let result = function() {
//         try {
//             console.log('is trying.....')
//             return dispatch(action)
//         } catch (err) {
//             console.error('Caught an exception!', err)
//             throw err
//         }
//     }
//     console.log('next state', store.getState())
//     return result

// }

function compose(...func) {
    return (args) => {
        return func.reduceRight((composed, f) => f(composed), args)
    }
}

function applyMiddleware(...middlewares) {
    return (next) => (reducer, initialState) => {
        var store = next(reducer, initialState)
        var dispatch = store.dispatch
        var chain = []
        var middlewareAPI = {
            getState: store.getState,
            dispatch: (action) => dispatch(action)
        }
        chain = middlewares.map(middleware => middleware(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)
        return {
            ...store,
            dispatch
        }


    }
}
var finalStore = applyMiddleware(logger, crashReporter)(createStore)(reducer, null)
const action=()=>{
    return finalStore.dispatch("sb")
}
finalStore.dispatch(action)
