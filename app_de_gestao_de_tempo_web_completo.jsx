// APP COMPLETO - Gestão de Tempo (Frontend + Backend)
// Stack: React + Tailwind + Node.js + Google Calendar API

// ================= FRONTEND =================

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function App() {
  const [aba, setAba] = useState("dashboard");
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/events")
      .then(res => res.json())
      .then(data => setEventos(data.items || []));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <h1 className="text-xl font-bold">Minha Rotina</h1>
        <nav className="space-y-2">
          <button onClick={() => setAba("dashboard")}>Dashboard</button>
          <button onClick={() => setAba("calendario")}>Calendário</button>
          <button onClick={() => setAba("tarefas")}>Tarefas</button>
          <button onClick={() => setAba("lideranca")}>Liderança</button>
          <button onClick={() => setAba("foco")}>Foco</button>
          <button onClick={() => setAba("planejamento")}>Planejamento</button>
        </nav>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        {aba === "dashboard" && <Dashboard eventos={eventos} />}
        {aba === "calendario" && <Calendario eventos={eventos} />}
        {aba === "tarefas" && <Tarefas />}
        {aba === "lideranca" && <Lideranca />}
        {aba === "foco" && <Foco />}
        {aba === "planejamento" && <Planejamento eventos={eventos} />}
      </div>
    </div>
  );
}

function Dashboard({ eventos }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <Card>
        <CardContent>
          <h3>Hoje</h3>
          {eventos.slice(0,5).map(e => (
            <p key={e.id}>{e.summary}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Calendario({ eventos }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">Calendário</h2>
      {eventos.map(e => (
        <Card key={e.id} className="mb-2">
          <CardContent>
            <p>{e.summary}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [nova, setNova] = useState("");

  const add = () => {
    setTarefas([...tarefas, { titulo: nova }]);
    setNova("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Tarefas</h2>
      <input value={nova} onChange={e => setNova(e.target.value)} />
      <Button onClick={add}>Adicionar</Button>
      {tarefas.map((t,i) => <p key={i}>{t.titulo}</p>)}
    </div>
  );
}

function Lideranca() {
  const [team, setTeam] = useState([]);
  const [nome, setNome] = useState("");

  const add = () => setTeam([...team, { nome, status: "In Progress" }]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Liderança</h2>
      <input value={nome} onChange={e => setNome(e.target.value)} />
      <Button onClick={add}>Adicionar</Button>
      {team.map((m,i) => (
        <p key={i}>{m.nome} - {m.status}</p>
      ))}
    </div>
  );
}

function Foco() {
  const [tempo, setTempo] = useState(1500);

  useEffect(() => {
    const timer = setInterval(() => {
      setTempo(t => t > 0 ? t - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Modo Foco</h2>
      <p>{tempo}s</p>
    </div>
  );
}

function Planejamento({ eventos }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">Planejamento</h2>
      <p>Total eventos: {eventos.length}</p>
    </div>
  );
}

// ================= BACKEND =================

/*
const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
app.use(cors());

const oauth2Client = new google.auth.OAuth2(
  'CLIENT_ID',
  'CLIENT_SECRET',
  'http://localhost:3001/callback'
);

app.get('/auth', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar']
  });
  res.redirect(url);
});

app.get('/callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  res.send('Autenticado com sucesso');
});

app.get('/events', async (req, res) => {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  const result = await calendar.events.list({ calendarId: 'primary' });
  res.json(result.data);
});

app.listen(3001, () => console.log('Servidor rodando'));
*/

// ================= COMO RODAR =================

/*
1. npm install
2. rodar backend: node server.js
3. rodar frontend: npm run dev
4. acessar http://localhost:5173
*/
