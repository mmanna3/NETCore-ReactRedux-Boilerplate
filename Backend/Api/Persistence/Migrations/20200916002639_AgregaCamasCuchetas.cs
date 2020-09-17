using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class AgregaCamasCuchetas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CamasCuchetas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AbajoId = table.Column<int>(nullable: true),
                    ArribaId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CamasCuchetas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CamasCuchetas_Camas_AbajoId",
                        column: x => x.AbajoId,
                        principalTable: "Camas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CamasCuchetas_Camas_ArribaId",
                        column: x => x.ArribaId,
                        principalTable: "Camas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CamasCuchetas_AbajoId",
                table: "CamasCuchetas",
                column: "AbajoId");

            migrationBuilder.CreateIndex(
                name: "IX_CamasCuchetas_ArribaId",
                table: "CamasCuchetas",
                column: "ArribaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CamasCuchetas");
        }
    }
}
