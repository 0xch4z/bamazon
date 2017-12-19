export async function up({ schema }) {
  await schema.createTableIfNotExists('Department', table => {
    table.increments('id')
    table.string('name')
  })
  await schema.createTableIfNotExists('Product', table => {
    table.increments('id')
    table.string('name')
    table.decimal('price', 14, 2)
    table.decimal('initialCost', 14, 2)
    table.integer('quantity')
    table.integer('historicQuantity')
    table.integer('departmentId')
      .unsigned()
      .references('Department.id')
  })
}

export async function down({ schema }) {
  await schema.dropTableIfExists('Product')
  await schema.dropTableIfExists('Department')
}
