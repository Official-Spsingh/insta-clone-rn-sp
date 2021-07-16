import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

function Feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (props.usersFollowingLoaded == props.following.length && props.following.length !== 0) {
            props.feed.sort(function (x, y) {
                return x.creation - y.creation;
            })
            setPosts(props.feed);
        }
        console.log(posts)

    }, [props.usersFollowingLoaded, props.feed])

    const onLikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser['_id'])
            .set({})
    }
    const onDislikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser['_id'])
            .delete()
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View
                            style={styles.containerImage}>
                            <Text style={styles.userName}>{item.user.name}</Text>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionIcons} onPress={() => item.currentUserLike ? onDislikePress(item.user.uid, item.id) : onLikePress(item.user.uid, item.id)}>
                                    {item.currentUserLike ?
                                        (
                                            <MaterialCommunityIcons name="heart" color="red" size={26} />
                                        )
                                        :
                                        (
                                            <MaterialCommunityIcons name="heart-outline" color="black" size={26} />
                                        )
                                    }
                                </Text>
                                <Text style={styles.actionIcons} onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}>
                                    <MaterialCommunityIcons
                                        name="comment-outline" color="black" size={26}

                                    />
                                </Text>
                            </View>
                            <Text style={styles.caption}><Text style={styles.userName}>{item.user.name}</Text> : <Text>{item.caption}</Text></Text>
                            <View
                                style={{
                                    borderBottomColor: '#9a9a9a',
                                    borderBottomWidth: 1,
                                    marginBottom: 10,
                                    marginTop: 10
                                }}
                            />
                        </View>

                    )}

                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1 / 3

    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    },
    userName: {
        flex: 1,
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 8,
        paddingLeft: 2,
    },
    actionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 2,
        paddingRight: 10,
        alignItems: 'center'
    },
    caption: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    actionIcons: {
        marginTop: 6,
        marginLeft: 2,
        marginBottom: 6,
        marginRight: 6
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,


})
export default connect(mapStateToProps, null)(Feed);