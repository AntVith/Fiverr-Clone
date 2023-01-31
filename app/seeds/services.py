from app.models import db, Service, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_services():
    service_1 = Service(
        user_id = 1, title='Python Backend Proficient' , description='I can help with python', price = 150 , thumbnail= 'https://www.python.org/static/community_logos/python-logo-master-v3-TM-flattened.png')
    service_2 = Service(
        user_id = 2, title='Java-Script Backend Proficient' , description='I can help with JS', price = 300 , thumbnail= 'https://cdn.geekboots.com/geek/javascript-meta-1652702081069.jpg')
    service_3 = Service(
        user_id = 3, title=' React Proficient' , description='I can help with react', price = 400 , thumbnail= 'https://www.goodworklabs.com/wp-content/uploads/2016/10/reactjs.png')

    db.session.add(service_1)
    db.session.add(service_2)
    db.session.add(service_3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_services():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.services RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM services")

    db.session.commit()
