from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=True)
    last_name = db.Column(db.String(120), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)
    is_admin = db.Column(db.Boolean(), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
            # do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,
                "is_active": self.is_active,
                "last_name": self.last_name,
                "first_name": self.first_name,
                "is_admin": self.is_admin}
    

class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(120), unique=True, nullable=True)
    price = db.Column(db.Float, unique=True, nullable=False)
    
    def __repr__(self):
        return f'<Product {self.name}>'

    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "description": self.description,
                "price": self.price}


#Instagram Data Model
class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_to = db.relationship('Users', foreign_keys=[following_id], backref=db.backref('following_to', lazy='select'))
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_to = db.relationship('Users', foreign_keys=[follower_id], backref=db.backref('follower_to', lazy='select'))
    
    def __repr__(self):
        return f'following: {self.following_id} - follower: {self.follower_id}'
    
    def serialize(self):
        return {"id": self.id,
                "following_id": self.following_id,
                "following_to": self.following_to,
                "follower_id": self.follower_id,
                "follower_to": self.follower_to}


class Medias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum("done",  name="media-type"), nullable=False)
    url = db.Column(db.String(120), unique=True, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts', foreign_keys=[post_id], backref=db.backref('medias_to', lazy='select'))

    def __repr__(self):
            return f'<Medias {self.id}>'

    def serialize(self):
        return {"id": self.id,
                "type": self.type,
                "url": self.url,
                "post_id": self.post_id}


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(120), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('comments_to', lazy='select'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts', foreign_keys=[post_id], backref=db.backref('comments_to', lazy='select'))

    def __repr__(self):
            return f'<Comments {self.user_id}>'

    def serialize(self):
        return {"id": self.id,
                "body": self.body,
                "user_id": self.user_id,
                "post:id": self.post_id}


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(120), unique=True, nullable=False)
    body = db.Column(db.String(120), unique=True, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    image_url = db.Column(db.String(120), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('post_to', lazy='select'))

    def __repr__(self):
            return f'<Posts {self.title}>'

    def serialize(self):
        return {"id": self.id,
                "title": self.title,
                "description": self.description,
                "body": self.body,
                "date": self.date,
                "image_url": self.image_url,
                "user_id": self.user_id}
    

class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    height = db.Column(db.String)
    mass = db.Column(db.String)
    hair_color = db.Column(db.String)
    skin_color = db.Column(db.String)
    eye_color = db.Column(db.String)
    birth_year = db.Column(db.String)
    gender = db.Column(db.String)

    def __repr__(self):
        return f"<Characters: {self.name}>"

    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "height": self.height,
                "mass": self.mass,
                "hair_color": self.hair_color,
                "skin_color": self.skin_color,
                "eye_color": self.eye_color,
                "birth_year": self.birth_year,
                "gender": self.gender}


class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    diameter = db.Column(db.String)
    rotation_period = db.Column(db.String)
    orbital_period = db.Column(db.String)
    gravity = db.Column(db.String)
    population = db.Column(db.String)
    climate = db.Column(db.String)
    terrain = db.Column(db.String)
    surface_water = db.Column(db.String)

    def __repr__(self):
        return f"<Planets: {self.name}>"

    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "climate": self.climate,
                "surface_water": self.surface_water,
                "diameter": self.diameter,
                "rotation_period": self.rotation_period,
                "terrain": self.terrain,
                "gravity": self.gravity,
                "orbital_period": self.orbital_period,
                "population": self.population}


class PlanetFavorites(db.Model):
    __tablename__ = 'planet_favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship("Users", foreign_keys=[user_id], backref=db.backref("planetfavorites_to", lazy="select"))
    planet_id = db.Column(db.Integer, db.ForeignKey("planets.id"))
    planet_to = db.relationship("Planets", foreign_keys=[planet_id], backref=db.backref("planets_to", lazy="select"))

    def __repr__(self):
        return f"<PlanetFavorites: {self.id}>"

    def serialize(self):
         return {"id": self.id,
                 "user_id": self.user_id,
                 "planet_id": self.planet_id}

class CharacterFavorites(db.Model):
    __tablename__ = 'character_favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship("Users", foreign_keys=[user_id], backref=db.backref("characterfavorites_to", lazy="select"))
    character_id = db.Column(db.Integer, db.ForeignKey("characters.id"))
    character_to = db.relationship("Characters", foreign_keys=[character_id], backref=db.backref("characters_to", lazy="select"))

    def __repr__(self):
        return f"<CharacterFavorites: {self.id}>"

    def serialize(self):
         return {"id": self.id,
                 "user_id": self.user_id,
                 "character_id": self.character_id}
