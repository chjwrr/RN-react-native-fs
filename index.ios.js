/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import RNFS from 'react-native-fs'

export default class RNDownLoad extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progressNum: 0,
            readTxtResult: '',
        };

        this.downloadFile = this.downloadFile.bind(this);
        this.writeFile = this.writeFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.readFile = this.readFile.bind(this);


    }

    /*下载文件*/
    downloadFile() {
        // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)

        // 图片
        // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.jpg`;
        // const formUrl = 'http://img.kaiyanapp.com/c7b46c492261a7c19fa880802afe93b3.png?imageMogr2/quality/60/format/jpg';

        // 文件
        // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.zip`;
        // const formUrl = 'http://files.cnblogs.com/zhuqil/UIWebViewDemo.zip';

        // 视频
        // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.mp4`;
        // http://gslb.miaopai.com/stream/SnY~bbkqbi2uLEBMXHxGqnNKqyiG9ub8.mp4?vend=miaopai&
        // https://gslb.miaopai.com/stream/BNaEYOL-tEwSrAiYBnPDR03dDlFavoWD.mp4?vend=miaopai&
        // const formUrl = 'https://gslb.miaopai.com/stream/9Q5ADAp2v5NHtQIeQT7t461VkNPxvC2T.mp4?vend=miaopai&';

        // 音频
        const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.mp3`;
        // http://wvoice.spriteapp.cn/voice/2015/0902/55e6fc6e4f7b9.mp3
        const formUrl = 'http://wvoice.spriteapp.cn/voice/2015/0818/55d2248309b09.mp3';

        const options = {
            fromUrl: formUrl,
            toFile: downloadDest,
            background: true,
            begin: (res) => {
                console.log('begin', res);
                console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            },
            progress: (res) => {

                let pro = res.bytesWritten / res.contentLength;

                this.setState({
                    progressNum: pro,
                });
            }
        };
        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
                console.log('success', res);

                console.log('file://' + downloadDest)

            }).catch(err => {
                console.log('err', err);
            });
        }
        catch (e) {
            console.log(error);
        }

    }


    /*将文本写入本地 txt*/
    writeFile() {
        // create a path you want to write to
        const path = RNFS.MainBundlePath + '/test.txt';

        // write the file
        RNFS.writeFile(path, '这是一段文本，YES', 'utf8')
            .then((success) => {
                console.log('path', path);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }


    /*删除文件*/
    deleteFile() {
        // create a path you want to delete
        const path = RNFS.MainBundlePath + '/test.txt';

        return RNFS.unlink(path)
            .then(() => {
                console.log('FILE DELETED');
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
                console.log(err.message);
            });
    }


    /*读取txt文件内容*/
    readFile() {
        // create a path you want to delete
        const path = RNFS.MainBundlePath + '/test.txt';

        return RNFS.readFile(path)
            .then((result) => {
                console.log(result);

                this.setState({
                    readTxtResult: result,
                })
            })
            .catch((err) => {
                console.log(err.message);

            });
    }


    /*在已有的txt上添加新的文本*/
    appendFile() {
        const path = RNFS.MainBundlePath + '/test.txt';

        return RNFS.appendFile(path, '新添加的文本', 'utf8')
            .then((success) => {
                console.log('success');
            })
            .catch((err) => {
                console.log(err.message);

            });
    }


    /*创建目录*/
    creatFile() {
        const path = RNFS.MainBundlePath + 'abc/test.txt' ;

        const options = {
            NSURLIsExcludedFromBackupKey: true, // iOS only
        };

        return RNFS.mkdir(path, options)
            .then(res => {
                console.log('success', res);

            }).catch(err => {
                console.log('err', err);
            });
    }


    /*上传文件 only iOS*/
    uploadFile() {
        const uploadSrc = `${RNFS.MainBundlePath}/test.txt`;

        const uploadUrl = 'http://buz.co/rnfs/upload-tester.php';

        const options = {
            toUrl: uploadUrl,
            files: [{name: 'myfile', filename: 'test.txt', filepath: uploadSrc, filetype: 'text/plain'}],
            background: true,
            method: 'POST', // PUT
            begin: (res) => {
                console.log('begin', res);
            },
            progress: (res) => {
                console.log('progress', res);
            }
        };

        const ret = RNFS.uploadFiles(options);

        return ret.promise.then(res => {
            const response = JSON.parse(res.body);
            console.log(response);

        })
            .catch(err => {
                console.log('err', err);
            });
    }

    render() {
        return (
            <View style={styles.container}>

                <View>
                    <TouchableOpacity onPress={()=>{
                    this.downloadFile()
                }}>
                    <Text> 下载 </Text>

                    </TouchableOpacity>
                    <Text style={{marginTop: 5}}>
                        进度: {this.state.progressNum}
                    </Text>
                </View>


                <View style={{marginTop: 30}}>
                    <TouchableOpacity onPress={()=>{
                    this.writeFile()
                }}>
                    <Text> 这是一段文本，YES   -->写入本地 txt </Text>
                    </TouchableOpacity>
                </View>


                <View style={{marginTop: 30}}>
                    <TouchableOpacity onPress={()=>{
                    this.readFile()
                }}>
                    <Text> 读取本地txt文件 result=({this.state.readTxtResult})</Text>
                    </TouchableOpacity>
                </View>


                <View style={{marginTop: 30}}>
                    <TouchableOpacity onPress={()=>{
                    this.deleteFile()
                }}>
                    <Text> 删除本地文件 </Text>
                    </TouchableOpacity>
                </View>


                <View style={{marginTop: 30}}>
                    <TouchableOpacity onPress={()=>{
                    this.appendFile()
                }}>
                    <Text> 在本地文件txt上添加新的内容 </Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 30}}>
                    <TouchableOpacity onPress={()=>{
                    this.creatFile()
                }}>
                    <Text> 创建新目录 </Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 30}}>
                    <TouchableOpacity onPress={()=>{
                    this.uploadFile()
                }}>
                    <Text> 上传文件 </Text>
                    </TouchableOpacity>
                </View>



            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('RNDownLoad', () => RNDownLoad);
