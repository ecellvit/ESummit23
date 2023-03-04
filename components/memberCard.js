import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

function MemberCard({ data, userRole, teamId, handleMemberRemove}) {
  const { data: session, status } = useSession()

  function handleRemove(teamId) {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/${teamId}`, {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.error?.errorCode) {
          toast.error(`${data.message}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
        handleMemberRemove()
        toast('Team member removed Successfully')
      })
  }
  return (
    <div className="h-64 rounded-2xl hover:scale-105 ease-linear bg-blue-700 ">
      <h2>{data.email}</h2>
      {userRole ? (
        <button
          onClick={(e) => handleRemove(teamId)}
          className="bg-red-700 mt-40 w-40 rounded-md p-2"
        >
          Remove
        </button>
      ) : (
        <h2>Leader</h2>
      )}
    </div>
  )
}

export default MemberCard
