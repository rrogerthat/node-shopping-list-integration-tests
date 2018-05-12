  // it('should update recipes on PUT', function() {

  //   const updateData = {
  //     name: 'foo',
  //     ingredients: ['bizz', 'bang']
  //   };

  //   return chai.request(app)
  //     // first have to get recipes so have `id` for one we
  //     // want to update. Note that once we're working with databases later
  //     // in this course get the `id` of an existing instance from the database,
  //     // which will allow us to isolate the PUT logic under test from our
  //     // GET interface.
  //     .get('/recipes')
  //     .then(function(res) {
  //       updateData.id = res.body[0].id;

  //       return chai.request(app)
  //         .put(`/recipes/${updateData.id}`)
  //         .send(updateData)
  //     })
  //     .then(function(res) {
  //       res.should.have.status(204);
  //     });