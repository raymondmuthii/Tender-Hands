# app/routes/charity.py
from flask import Blueprint, request, jsonify
from app.models import Charity
from app.models import Story
from app import db

bp = Blueprint('charity', __name__, url_prefix='/api/charities')

@bp.route('/', methods=['GET'])
def get_charities():
    try:
        status = request.args.get('status', 'approved')
        charities = Charity.query.filter_by(status=status).all()
        return jsonify({
            'status': 'success',
            'charities': [{
                'id': c.id,
                'name': c.name,
                'description': c.description,
                'total_donations': c.total_donations,
                'target_amount': c.target_amount,
                'stories_count': len(c.stories)
            } for c in charities]
        }), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@bp.route('/<int:charity_id>/stories', methods=['GET', 'POST'])
def handle_stories(charity_id):
    charity = Charity.query.get_or_404(charity_id)
    
    if request.method == 'GET':
        return jsonify({
            'status': 'success',
            'stories': [{
                'id': s.id,
                'title': s.title,
                'content': s.content,
                'created_at': s.created_at
            } for s in charity.stories]
        }), 200
    
    # POST method
    try:
        data = request.json
        story = Story(
            charity_id=charity_id,
            title=data['title'],
            content=data['content']
        )
        db.session.add(story)
        db.session.commit()
        return jsonify({
            'status': 'success',
            'message': 'Story added successfully',
            'story_id': story.id
        }), 201
    except KeyError as e:
        return jsonify({'status': 'error', 'message': f'Missing field: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

