const { pgTable, integer, varchar, text, primaryKey, unique, pgEnum } = require("drizzle-orm/pg-core")
const { relations } = require("drizzle-orm")

const songKey = pgEnum("song_key", ["C", "C#", "Db", "D", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "B", "H",
  "Cm", "C#m", "Dm", "Ebm", "D#m", "Em", "Fm", "F#m", "Gm", "G#m", "Abm", "Am", "Bm"])

const artists = pgTable("artists", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull().unique(),
  coverImage: text().notNull(),
})

const songs = pgTable("songs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  artistId: integer().notNull().references(() => artists.id, { onDelete: "restrict" }),
  originalKey: songKey().notNull(),
  intro: text(),
  lyricsChords: text().notNull(),
}, (t) => [unique().on(t.artistId, t.title)])


const repertoires = pgTable("repertoires", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
})

const repertoireSongs = pgTable("repertoire_songs", {
  repertoireId: integer().notNull().references(() => repertoires.id, { onDelete: "cascade" }),
  songId: integer().notNull().references(() => songs.id, { onDelete: "cascade" }),
  transposeStep: integer().notNull().default(0),
  position: integer().notNull().default(0),
}, (t) => [primaryKey({ columns: [t.repertoireId, t.songId] })])

const artistsRelations = relations(artists, ({ many }) => ({ songs: many(songs) }))
const songsRelations = relations(songs, ({ one, many }) => ({
  artist: one(artists, { fields: [songs.artistId], references: [artists.id] }),
  repertoireSongs: many(repertoireSongs),
}))
const repertoiresRelations = relations(repertoires, ({ many }) => ({
  repertoireSongs: many(repertoireSongs),
}))
const repertoireSongsRelations = relations(repertoireSongs, ({ one }) => ({
  repertoire: one(repertoires, { fields: [repertoireSongs.repertoireId], references: [repertoires.id] }),
  song: one(songs, { fields: [repertoireSongs.songId], references: [songs.id] }),
}))

module.exports = {
  artists, songs, songKey, repertoires, repertoireSongs,
  artistsRelations, songsRelations, repertoiresRelations, repertoireSongsRelations,
}
