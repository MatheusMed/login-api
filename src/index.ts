import Express from "express";
import prisma from "./prisma-conect";
import bcrypt from 'bcrypt';
import bodyParser from "body-parser";

const app = Express();


app.use(bodyParser.json());


app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  res.json(user);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });


  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  

 
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({message:"Erro, senha errada tente novamente"});
  }
  return res.status(200).json({message:"Login com sucesso"});

});

app.post(`/todos`, async (req, res) => {
  const { titulo, content, color, completed, email } = req.body;

  const result = await prisma.todos.create({
    data: {
      titulo, content, color, completed,
      author: { connect: { email } },
    },
  })

  res.json(result)
})


app.get('/feedTodos', async (req, res) => {
  const posts = await prisma.todos.findMany({
    include: { author: false }
  })
  res.json(posts)
})


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})