import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const MakeTeam = () => {
  const [teamName, setTeamName] = useState('');
  const router = useRouter();
  const session= useSession();

  const handleCreateTeam = async () => {
    try {
      // Send a request to the backend to check if the team name is unique
      const response = await fetch(process.env.NEXT_PUBLIC_SERVER + '/team/createTeam', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessTokenBackend}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'teamName':teamName }),
      });

      const data = await response.json();
      console.log("not found",data);

      if (data) {
        // Team name is unique, so redirect to TeamCode page
        router.push('/teamCode');
      }
      // else {
      //  // Team name is already used, display an error message
      //  alert('Team name already used. Please choose a different name.');
      //}
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleJoinTeam = () => {
    // Redirect to JoinTeam page
    router.push('/joinTeam');
  };
  //useEffect(()=>{
  //  if(!session){
  //    console.log("redirecting")
  //    router.push("/");
  //  }
  //},[])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border border-gray-300 rounded shadow-md p-6 bg-white w-96 text-center mt-8">
        <h1 className="text-2xl font-semibold mb-4 text-black">Make a Team</h1>
        <div className="mb-4">
          <input 
            type="text"
            placeholder="Enter Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full p-2 border text-black border-gray-300 rounded"
          />
        </div>
        <div className="text-center">
        <button
          className="px-4 py-2 rounded cursor-pointer bg-blue-500 text-white mb-4 w-32 h-12"
          onClick={handleCreateTeam}
        >
          Create Team
        </button>
        <div className=" border-b border-black"><hr></hr></div>{/*Line*/}
        <button
          className="px-4 py-2 rounded cursor-pointer bg-green-500 text-white mt-4 w-32 h-12"
          onClick={handleJoinTeam}
        >
          Join Team
        </button>
        </div>
      </div>
    </div>
  );
};

export default MakeTeam;