import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, USERS_LIKES_STATE_CHANGE, CLEAR_DATA } from '../constants/index'
import firebase from 'firebase'
import { SnapshotViewIOSComponent } from 'react-native'
import axios from "axios"
require('firebase/firestore')


export function clearData() {
    return ((dispatch) => {
        dispatch({ type: CLEAR_DATA })
    })
}
export function fetchUser(token) {
    return ((dispatch) => {
        // firebase.firestore()
        //     .collection("users")
        //     .doc(firebase.auth().currentUser.uid)
        //     .get()
        //     .then((snapshot) => {
        //         if (snapshot.exists) {
        //             dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
        //         }
        //         else {
        //             console.log('does not exist')
        //         }
        //     })
        axios.get("http://localhost:4000/user/me", {
            headers: {
                "token": token
            }
        }).then(res => {
            console.log(res)
            dispatch({ type: USER_STATE_CHANGE, currentUser: res.data })
        }).catch(err => {
            console.log(err)
        })
    })
}

export function fetchUserPosts() {
    return ((dispatch) => {
        // firebase.firestore()
        //     .collection("posts")
        //     .doc(firebase.auth().currentUser.uid)
        //     .collection("userPosts")
        //     .orderBy("creation", "asc")
        //     .get()
        //     .then((snapshot) => {
        //         let posts = snapshot.docs.map(doc => {
        //             const data = doc.data();
        //             const id = doc.id;
        //             return { id, ...data }
        //         })
        //         dispatch({ type: USER_POSTS_STATE_CHANGE, posts })
        //     })
        axios.get("http://localhost:4000/userdata/post", {
            headers: {
                "token": token
            }
        }).then(res => {
            console.log(res)
            dispatch({ type: USER_STATE_CHANGE, currentUser: res.data })
        }).catch(err => {
            console.log(err)
        })
    })
}

export function fetchUserFollowing() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .onSnapshot((snapshot) => {
                let following = snapshot.docs.map(doc => {
                    const id = doc.id;
                    return id
                })
                dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
                for (let i = 0; i < following.length; i++) {
                    dispatch(fetchUsersData(following[i], true));
                }
            })
    })
}

export function fetchUsersData(uid, getPosts) {
    return ((dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid);
        if (!found) {
            firebase.firestore()
                .collection("users")
                .doc(uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        let user = snapshot.data();
                        user.uid = snapshot.id;

                        dispatch({ type: USERS_DATA_STATE_CHANGE, user });
                    }
                    else {
                        console.log('does not exist')
                    }
                })
            if (getPosts) {
                dispatch(fetchUsersFollowingPosts(uid));
            }
        }
    })
}

export function fetchUsersFollowingPosts(uid) {
    return ((dispatch, getState) => {
        firebase.firestore()
            .collection("posts")
            .doc(uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                console.log(snapshot)
                const uid = snapshot.query['_delegate']['_query'].path.segments[1];
                const user = getState().usersState.users.find(el => el.uid === uid);


                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data, user }
                })

                for (let i = 0; i < posts.length; i++) {
                    dispatch(fetchUsersFollowingLikes(uid, posts[i].id))
                }
                dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid })

            })
    })
}

export function fetchUsersFollowingLikes(uid, postId) {
    return ((dispatch, getState) => {
        firebase.firestore()
            .collection("posts")
            .doc(uid)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot((snapshot) => {
                const postId = snapshot['_delegate']['_key'].path.segments[3];

                let currentUserLike = false;
                if (snapshot.exists) {
                    currentUserLike = true;
                }

                dispatch({ type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike })
            })
    })
}