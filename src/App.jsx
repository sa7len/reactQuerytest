import { useQuery, useMutation} from "@tanstack/react-query";

function App() {
  const { data, isLoading, error} = useQuery({
    queryKey: ['todo'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json()),
  });
const {isPending, isError, mutate}= useMutation({
  mutationFn:(newPost)=>fetch('https://jsonplaceholder.typicode.com/posts',{
    method:"POST",
    body:JSON.stringify(newPost),
    headers:{"Content-type": "application/json; charset=UTF-8"}
  }).then((res) => res.json()),
})

if (isLoading || isPending){
  <div>Loading...</div>
}
if(error || isError){
  <div>there is an error</div>
}
  return (
    <div>
      <button onClick={()=> mutate({ 
    "userId": 500,
    "id": 1,
    "title": "hey my name is max",
    "body": "quia et suscipitsuscipit recusandae consequuntur expedita et cumreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  })}>add</button>
      {data?.map((todo) => (
        <>
        <h1 key={todo.id}>{todo.id}</h1>
        <p>{todo.title}</p>
        <h2>{todo.body}</h2>
        </>
      ))}
    </div>
  );

}

export default App;

