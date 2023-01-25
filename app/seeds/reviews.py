from app.models import db, Review, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    review_1 = Review(
        user_id = 1, service_id =2 , review='great help', stars = 5)
    review_2 = Review(
        user_id = 2, service_id =3 , review='do not recomment', stars = 2)
    review_3 = Review(
        user_id = 3, service_id =1 , review='amazing',  stars = 4)

    db.session.add(review_1)
    db.session.add(review_2)
    db.session.add(review_3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
