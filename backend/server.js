const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/pokemon-team-builder', { useNewUrlParser: true, useUnifiedTopology: true });

const teamSchema = new mongoose.Schema({
  userID: mongoose.Schema.Types.ObjectId,
  teamName: String,
  description: String,
  teamMembers: [{
    pokemonID: String,
    pokemonName: String,
    imageUrl: String,
    nickname: String,
    selectedMoves: [String],
    evs: {
      hp: Number,
      attack: Number,
      defense: Number,
      speed: Number
    },
    ivs: {
      hp: Number,
      attack: Number,
      defense: Number,
      speed: Number
    }
  }],
  teamItems: [{
    itemID: mongoose.Schema.Types.ObjectId,
    quantity: Number
  }]
});

const Team = mongoose.model('Team', teamSchema);

app.post('/api/teams', async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.send(team);
});

app.get('/api/getTeams', async (req, res) => {
  const teams = await Team.find();
  res.send(teams);
});

app.post('/api/addPokemonToTeam', async (req, res) => {
  const { teamId, pokemon } = req.body;
  const team = await Team.findById(teamId);
  if (team) {
    if (team.teamMembers.length >= 6) {
      return res.status(400).send('Team cannot have more than 6 Pokémon');
    }
    if (team.teamMembers.some(member => member.pokemonID === pokemon.pokemonID)) {
      return res.status(400).send('Duplicate Pokémon cannot be added to the team');
    }
    team.teamMembers.push(pokemon);
    await team.save();
    res.send(team);
  } else {
    res.status(404).send('Team not found');
  }
});

app.post('/api/removePokemonFromTeam', async (req, res) => {
  const { teamId, pokemonId } = req.body;
  const team = await Team.findById(teamId);
  if (team) {
    team.teamMembers = team.teamMembers.filter(member => member.pokemonID !== pokemonId);
    await team.save();
    res.send(team);
  } else {
    res.status(404).send('Team not found');
  }
});

app.post('/api/deleteTeam', async (req, res) => {
  const { teamId } = req.body;
  const result = await Team.deleteOne({ _id: teamId });
  if (result.deletedCount > 0) {
    res.send({ message: 'Team deleted successfully' });
  } else {
    res.status(404).send('Team not found');
  }
});

app.get('/api/pokemon', async (req, res) => {
  const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
  res.send(data.results);
});

// In-memory storage for configurations (for example purposes)
const configurations = {};

// Get Pokemon configuration
app.get('/api/getPokemonConfiguration/:teamId/:pokemonName', (req, res) => {
  const { teamId, pokemonName } = req.params;
  const config = configurations[`${teamId}-${pokemonName}`] || null;
  res.json(config);
});

// Save Pokemon configuration
app.post('/api/savePokemonConfiguration', (req, res) => {
  const { teamId, pokemonName, configuration } = req.body;
  configurations[`${teamId}-${pokemonName}`] = configuration;
  res.json({ success: true });
});

app.listen(3000, () => console.log('Server started on port 3000'));
