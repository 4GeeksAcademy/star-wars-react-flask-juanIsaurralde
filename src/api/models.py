from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=True, nullable=True)
    last_name = db.Column(db.String(120), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
            # do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,
                "is_active": self.is_active,
                "last_name": self.last_name,
                "first_name": self.first_name}
    

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
                "follower_id": self.following_id,
                "follower_to": self.following_to}


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
