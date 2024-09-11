const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Verifique se o cabeçalho de autorização está presente e começa com 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Token ausente ou formato incorreto'); // Log para depuração
    return res.status(401).json({ error: 'Token não fornecido ou formato incorreto' });
  }

  // Extraia o token do cabeçalho
  const token = authHeader.split(' ')[1];

  // Verifique e decodifique o token JWT
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log('Erro na verificação do token:', err); // Log para depuração
      return res.status(403).json({ error: 'Token inválido' });
    }

    // Adicione as informações do usuário ao objeto de requisição
    req.user = user;

    // Log para verificar o conteúdo do usuário (remova em produção)
    console.log('Usuário autenticado:', req.user);

    // Continue para o próximo middleware ou rota
    next();
  });
};

module.exports = authenticateToken;
