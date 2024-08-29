import SearchBar from '@/components/shared/SearchBar'
import { useGetAllAvailableRoomsQuery } from '@/redux/api/rooms.api'
import { TRoom } from '@/types/room.types'
import React from 'react'

const Rooms = () => {
  const {data, isLoading} = useGetAllAvailableRoomsQuery([{key:"limit", value:"10"}])
  const roomData:TRoom = !isLoading ? data?.data : []

  console.log(roomData)
  return (
    <div className="md:p-12 p-8 ">
      <SearchBar></SearchBar>

      {
        
      }
    </div>
  )
}

export default Rooms