"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, CharacterFavorites, PlanetFavorites, Characters
import requests

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body["message"] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route('/products', methods=['POST', 'GET'])
def products():
    response_body = {}
    if request.method == 'GET':
        response_body['message'] = f'Respuesta para el metodo {request.method}'
        return response_body, 200
    if request.method == 'POST':
        response_body['message'] = f'Respuesta para el metodo {request.method}'
        return response_body, 200
    

@api.route('/products/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def product(id):
    response_body = {}
    if request.method == 'GET':
        response_body['message'] = f'Respuesta para el metodo {request.method} del id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        response_body['message'] = f'Respuesta para el metodo {request.method} del id: {id}'
        return response_body, 200
    if request.method == 'DELETE':
        response_body['message'] = f'Respuesta para el metodo {request.method} del id: {id}'
        return response_body, 200
    
# From SWAPI
@api.route('/characters', methods=['GET', 'POST'])
def characters():
    response_body = {}
    if request.method == 'GET':
        url = 'https://swapi.tech/api/people'
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            print(data['results'])
            response_body['message'] = 'Listado de Personajes'
            response_body['results'] = data['results']
            return response_body, 200
        response_body['message'] = 'algo salió mal'
        return response_body, 400
    if request.method == 'POST':
        data = request.get_json()
        character_name = data.get('character_name')
        newCharacter = Characters(name=character_name)
        db.session.add(newCharacter)
        db.session.commit()
        response_body['message'] = f'Salio todo bien'
        return response_body, 200


@api.route('/characters/<int:character_id>', methods=['GET'])
def character(character_id):
    response_body = {}
    url = f'https://swapi.tech/api/people/{character_id}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(data['result'])
        response_body['message'] = 'Detalles del Personaje'
        response_body['results'] = data['result']['properties']
        return response_body, 200
    response_body['message'] = 'algo salió mal'
    return response_body, 400


@api.route('/planets', methods=['GET'])
def planets():
    response_body = {}
    url = 'https://swapi.tech/api/planets'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(data['results'])
        response_body['message'] = 'Listado de Planetas'
        response_body['results'] = data['results']
        return response_body, 200
    response_body['message'] = 'algo salió mal'
    return response_body, 400


@api.route('/planets/<int:planet_id>', methods=['GET'])
def planet(planet_id):
    response_body = {}
    url = f'https://swapi.tech/api/planets/{planet_id}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(data['result'])
        response_body['message'] = 'Detalles del Planeta'
        response_body['results'] = data['result']['properties']
        return response_body, 200
    response_body['message'] = 'algo salió mal'
    return response_body, 400


# From the DB
@api.route('/users', methods=['GET', 'POST'])
def users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in rows]
        response_body["message"] = f"Listado de Usuarios"
        response_body["results"] = results
        return response_body, 200


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None)  # Se puede hacer de esta forma o de la siguiente
    password = request.json.get("password", None)  # Se puede hacer de esta forma o de la anterior
    row = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active)).scalar()
    if not row:
        response_body['message'] = "Bad username or password"
        return response_body, 401
    user = row.serialize()
    claims = {'user_id': user['id'],
              'is_admin': user['is_admin']}
    print(claims)
    access_token = create_access_token(identity=email, additional_claims=claims )
    response_body['message'] = 'User logged'
    response_body['access_token'] = access_token
    return response_body, 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    response_body = {}
    current_user = get_jwt_identity()
    response_body['message'] = f'User logged: {current_user}'
    return response_body, 200


@api.route('/users/<int:user_id>/favorites', methods=['GET'])
def user(user_id):
    response_body = {}
    rows = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.user_id == user_id)).scalars()
    result_character = [row.serialize() for row in rows]
    rows = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id == user_id)).scalars()
    result_planets = [row.serialize() for row in rows]
    results = [result_character, result_planets]
    response_body["message"] = f"Listado de Usuarios"
    response_body["results"] = results

    return response_body, 200


@api.route('/users/<int:user_id>/favorites-planets', methods=['GET', 'POST'])
def user_favorites_planets(user_id):
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id == user_id)).scalars()
        result_planets = [row.serialize() for row in rows]
        response_body["message"] = f"Listado de Planetas Favoritos del usuario {user_id}"
        response_body["results"] = result_planets
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = PlanetFavorites(planet_id=data['planet_id'], user_id=user_id )
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Se guardo exitosamente'
        return response_body, 200
    

@api.route('/users/<int:user_id>/favorites-characters', methods=['GET', 'POST'])
def user_favorites_characters(user_id):
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.user_id == user_id)).scalars()
        result_characters = [row.serialize() for row in rows]
        response_body["message"] = f"Listado de Characters Favoritos del usuario {user_id}"
        response_body["results"] = result_characters
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = CharacterFavorites(character_id=data['character_id'], user_id=user_id )
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Se guardo exitosamente'
        return response_body, 200


@api.route('/users/<int:user_id>/favorites-characters/<int:characters_id>', methods=['DELETE'])
def delete_user_favorites_character(user_id, characters_id):
    response_body = {}
    row = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.user_id == user_id, CharacterFavorites.character_id == characters_id )).scalar()
    db.session.delete(row)
    db.session.commit()
    response_body['messaje'] = 'Se borro exitosamente'
    return response_body, 200

@api.route('/users/<int:user_id>/favorites-planets/<int:planet_id>', methods=['DELETE'])
def delete_user_favorites_planet(user_id, planet_id):
    response_body = {}
    row = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id == user_id, PlanetFavorites.planet_id == planet_id )).scalar()
    db.session.delete(row)
    db.session.commit()
    response_body['messaje'] = 'Se borro exitosamente'
    return response_body, 200
