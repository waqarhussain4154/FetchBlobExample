import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  
  download2(){
    RNFetchBlob
    .config({
        addAndroidDownloads : {
            useDownloadManager : true, // <-- this is the only thing required
            // Optional, override notification setting (default to true)
            notification : false,
            // Optional, but recommended since android DownloadManager will fail when
            // the url does not contains a file extension, by default the mime type will be text/plain
            mime : 'text/plain',
            description : 'File downloaded by download manager.'
        }
    })
    .fetch('GET', 'https://abdulrahman.fleeti.com/save_file/uploads/category/YQZzH8yY836Igx05fRKpkEgl9h51RDQkIYTiXPow.jpeg')
    .then((resp) => {
      // the path of downloaded file
      console.log(`resp`, resp)
      resp.path()
    })
  }

  actualDownload = () => {
    const { dirs } = RNFetchBlob.fs;
   RNFetchBlob.config({
     fileCache: true,
     addAndroidDownloads: {
     useDownloadManager: true,
     notification: true,
     mediaScannable: true,
     title: `test.pdf`,
     path: `${dirs.DownloadDir}/test.pdf`,
     },
   })
     .fetch('GET', 'http://www.africau.edu/images/default/sample.pdf', {})
     .then((res) => {
       console.log('The file saved to ', res.path());
     })
     .catch((e) => {
       console.log(e)
     });
 }
 
 downloadFile =async () => {
   try {
       const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         this.actualDownload();
       } else {
         Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
       }
     } catch (err) {
       console.warn(err);
     } 
 }
 
  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <Text> textInComponent </Text>
        <Button title="Press me" onPress={this.actualDownload} />
      </View>
    );
  }
}
