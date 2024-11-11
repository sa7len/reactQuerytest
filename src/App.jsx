import { useQuery, useMutation, useQueryClient, } from "@tanstack/react-query";

function App() {
  const queryClient = useQueryClient();
  const { data, isLoading, error} = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('http://localhost:3000/users')
      .then((res) => res.json()),
  });
  const { isPending, isError, mutate } = useMutation({
    mutationFn: (newPost) =>
      fetch('http://localhost:3000/users', {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }).then((res) => res.json()),
    onSuccess: (newUser) => {
      queryClient.setQueryData(['users'], (oldData) => [...(oldData || []), newUser]);
    },
  });
if (isLoading || isPending){
  <div>Loading...</div>
}
if(error || isError){
  <div>there is an error</div>
}
  return (
    <div>
      <button onClick={()=> mutate({ 
    "name": "sayali",
    "country": "Azerbaijan",
    "occupation":"frontend developer"
  })}>add</button>
      {data?.map((users) => (
        <>
        <h1 key={users.id}>{users.id}</h1>
        <p>{users.name}</p>
        <h2>{users.country}</h2>
        <h2>{users.occupation}</h2>
        </>
      ))}
    </div>
  );

}

export default App;

