using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using QuestPDF.Previewer;

Document.Create(container =>
{
    container.Page(page =>
    {
        page.Margin(30);
        page.Header().ShowOnce().Row(row =>
        {
            var rutaImagen = Path.Combine("Images/sanmartin.png");
            byte[] imageData = System.IO.File.ReadAllBytes(rutaImagen);

            row.ConstantItem(100).Image(imageData);


          
            row.RelativeItem()
            .AlignCenter()
            .Width(400)

            .Column(col =>
            {
                col.Item()
                .AlignCenter()
                .PaddingBottom(5)
                .Text("Cooperación periodo 2023-2024")
                .Bold()
                .FontSize(16);

                col.Item().Background("#3748a6")
                .AlignCenter()
                .Text("Integrante comité")
                .FontColor("#fff")
                .FontSize(13);

                col.Item()
                .AlignCenter().Text("Diego Luna Olea")
                 .Bold()
                 .FontSize(13);

                col.Item().Background("#3748a6")
                .AlignCenter()
                .Text("Total")
                .FontColor("#fff")
                .FontSize(13);

                col.Item()
                .AlignCenter()
                .Text("$3500.00")
                .Bold()
                .FontSize(14);



            });


        });

        page.Content().PaddingVertical(10).Column(col1 =>
        {


            col1.Item().LineHorizontal(0.5f);
            //Tabla
            col1.Item().Table(tabla =>
            {
                tabla.ColumnsDefinition(columns =>
                {
                   // columns.ConstantColumn(1);
                    columns.RelativeColumn(3);
                    columns.RelativeColumn(3);
                    //columns.RelativeColumn();
                    //columns.RelativeColumn();

                });

                tabla.Header(header =>
                {
                    header.Cell()
                    .Background("#3748a6")
                    .MinWidth(267)
                    .Padding(2).Text("Nombre").FontColor("#fff");

                    header.Cell()

                   .AlignCenter()
                    .Background("#3748a6")
                     .MinWidth(267)
                     .AlignCenter()
                   .Padding(2).Text("Monto").FontColor("#fff");

                 
                });

                foreach (var item in Enumerable.Range(1, 45))
                {
                    var cantidad = Placeholders.Random.Next(1, 10);
                    var precio = Placeholders.Random.Next(5, 15);
                    var total = cantidad * precio;

                    tabla.Cell().BorderBottom(0.5f).BorderColor("#D9D9D9")
                    .Padding(2).Text(Placeholders.Label()).FontSize(13);

                    tabla.Cell()
                    .AlignCenter()
                    .BorderBottom(0.5f)
                    .BorderColor("#D9D9D9")
                    .Padding(2)
                    .Text(cantidad.ToString()).FontSize(13);

                }

            });

            col1.Item().AlignRight().Text("Total: 1500").FontSize(12);

        });

        page.Footer()
       .AlignRight()
       .Text(txt =>
       {
           txt.Span("Pagina ").FontSize(10);
           txt.CurrentPageNumber().FontSize(10);
           txt.Span(" de ").FontSize(10);
           txt.TotalPages().FontSize(10);
       });
    });
}).ShowInPreviewer();