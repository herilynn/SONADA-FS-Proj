class CreateMembership < ActiveRecord::Migration[7.0]
  def change
    create_table :memberships do |t|
      t.bigint :member_id, null: false, index: true, foreign_key: {to_table: :users}
      t.bigint :group_id, null: false, index: true, foreign_key: {to_table: :groups}
      t.timestamps
    end
    # add_foreign_key
  end
end
