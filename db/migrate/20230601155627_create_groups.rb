class CreateGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :groups do |t|
      t.string :name, null: false, index: true
      t.text :description, null: false
      t.string :location, null: false
      t.bigint :owner_id, null: false, index: true
      # t.bigInt :member_id, null: false
      # t.string :member_list
      t.timestamps
    end
    add_foreign_key :groups, :users, column: :owner_id
  end
end
