import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { Div, Text } from 'react-native-magnus'
import UploadPictureActivity from './UploadPictureActivity'

const UploadImageActivity = () => {
    const [image, setImage] = useState([])
    const [images, setImages] = useState(null)

    const RenderItem = () => {
        const [images] = useState(null)
        return (
        <UploadPictureActivity
          isOrder={false}
          value={images}
       
          text="Upload Photo"
        />
        )
    }

  return (
    <Div>
        
          <UploadPictureActivity
             isOrder={true}
             value={images}
             setValue={setImages}
             text="Upload Photo"
           />
        {/* <FlatList data={image} renderItem={RenderItem} ListEmptyComponent={(
             <UploadPictureActivity
             isOrder={true}
             value={images}
             setValue={() => {
                setImages()
             }}
             text="Upload Photo"
           />
        )}/>
        */}
    </Div>
  )
}

export default UploadImageActivity