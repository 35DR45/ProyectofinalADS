
package Api;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Eliminar extends HttpServlet {
     private PrintWriter out;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        out = response.getWriter();
        String ide = request.getParameter("id");
    try{
        String Driver ="com.mysql.cj.jdbc.Driver";
        String Url = "jdbc:mysql://localhost/crudjson";
    Class.forName(Driver);
    Connection db = DriverManager.getConnection(Url, "root", "root");
    Statement s = db.createStatement();    
    String Query="DELETE FROM tablajson WHERE JSON_EXTRACT(columnajson,'$.id') = '"+ide+"'";
    s.executeUpdate(Query);
    out.write(ide);
    }
    catch(ClassNotFoundException | SQLException e){
    e.printStackTrace();
        }
    }
}
