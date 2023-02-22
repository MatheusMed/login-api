import Express from "express";
import prisma from "./prisma-conect";
import bcrypt from 'bcrypt';
import bodyParser from "body-parser";
import cors from 'cors';

const app = Express();


app.use(bodyParser.json());
app.use(Express.json());
app.use(cors());


const PORT = process.env.PORT;


app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

 try {
   const hashedPassword = await bcrypt.hash(password, 10);
 
   const user = await prisma.user.create({
     data: {
       name,
       email,
       password: hashedPassword,
     },
   });
 
   res.json(user);
 } catch (error) {
  return res.status(500).json({message:"Erro ao criar usuario"});
 }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  const token = await prisma.user.findFirst();

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({message:"Erro, senha errada tente novamente"});
  }
  return res.status(200).json({message:"Login com sucesso", token:token.token });

});

app.post('/todos', async (req, res) => {
  const { titulo, content, color,  email } = req.body;

  try {
    const result = await prisma.todos.create({
      data: {
        titulo, content, color,
        author: { connect: { email } },
      },
    })
  
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({message:" Erro ao criar sua nota"});
  }
})


app.get('/feedTodos', async (req, res) => {

  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where:{ email }
    });
  
    if(email == user.email) {
  
      try {
        const posts = await prisma.todos.findMany({
          where:{authorEmail:email},
          include: { author: false }
        })
      
      return res.status(200).json(posts);
      } catch (error) {
        
      return res.status(500).json({message:"Erro ao fazer a lista da sua listinha"});
      }
    }
  } catch (error) {
    return res.status(500).json({message:`Email nao existente`});
  }

})


app.delete('/todos/:id',async (req,resp)=>{
  const { id } = req.params;

  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where:{ email }
  });

  if(email == user.email) {
  try {
    await prisma.todos.delete({
      where: { id: parseInt(id) },
    });
    resp.status(200).json({message: 'Todo deletado com sucesso'});
  } catch (error) {
    resp.status(500).json({message:'Ocorreu um erro ao deletar o todo'});
  }
}
})

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, content, color  } = req.body;

  try {
    await prisma.todos.update({
      where: { id: parseInt(id) },
      data: { titulo,content,color  },
    });
    res.status(200).json('Usuário atualizado com todo');

  } catch (error) {
    res.status(500).json('Ocorreu um erro ao atualizar o todo');
  }
});


app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})