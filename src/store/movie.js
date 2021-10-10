export default {
    namespaced:true,
    state(){
        return {
            showModal: false,
            isLoading: false
        }
    },
    getters:{

    },
    mutations:{
        assignState(state, payload) {
            Object.keys(payload).forEach(key => {
              state[key] = payload[key]
            })
        },
        ToggleModal(state){
            state.showModal = !state.showModal
        },
        ResizingImg(state, payload){
            const posterArray = payload.Poster.split('_')
            const sizeIndex = posterArray.indexOf('SX300.jpg')
            posterArray[sizeIndex] = 'SX700.jpg'
            const resizeImg = posterArray.join('_')
            payload.Poster = resizeImg
        },
        ToggleLoading(state){
            state.isLoading = !state.isLoading
        }
    },
    actions:{
        async searchMovies({ commit }, payload){
            commit('ToggleLoading')
            const data = await _request(payload)
            commit('assignState', data)
            commit('ToggleLoading')
        },
        async detailMovie({ commit }, payload){
            // loading 때 사용해보자. 여기다 commit('ToggleModal') 작성하면 현재 단계에서는 최초에 
            // 포스터에 대한 정보가 없어 에러가 발생함
            commit('ToggleLoading')
            const data = await _request(payload)
            commit('ResizingImg', data)
            const selectedMovie = { selectedMovie: {...data}}
            commit('assignState', selectedMovie)
            commit('ToggleModal')
            commit('ToggleLoading')
        }
    }
}

async function _request(options){
    return await fetch('/.netlify/functions/muntariMovie',{
        method: 'POST',
        body: JSON.stringify(options)
    }).then(res => res.json())
}